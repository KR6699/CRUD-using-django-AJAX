$('#submitid').click(function() {
    let email = $('#emailid').val()
    let password = $('#passwordid').val()
    let csr = $('input[name=csrfmiddlewaretoken]').val();
    if (email && password) {
        $.ajax({
            url: "create/",
            method: 'POST',
            data: {
                'email': email,
                'password': password,
                'csrfmiddlewaretoken': csr
            },
            dataType: 'json',
            success: function(data) {
                $('.table > tbody:last-child').append(
                    `<tr class="alert alert-warning" id="tr${data.id}" role="alert">
                    <td id="id${data.id}">${data.id}</td>
                    <td id="email${data.id}">${data.email}</td>
                    <td id="password${data.id}">${data.password}</td>
                    <td>
                        <button type="button" class="btn btn-warning editbtn" id="${data.id}"  onclick="updateUser(${data.id})" data-bs-toggle="modal" data-bs-target="#myModal">Edit</button>
                        <button type="button" class="btn btn-danger deletebtn" id="${data.id}" onclick="deleteUser(${data.id})">Delete</button>
                    </td>
                </tr>`
                )
                $('form')[0].reset()
            }
        })
    }
})

function deleteUser(id) {
    var action = confirm("Are you sure you want to delete this user?");
    let csr = $('input[name=csrfmiddlewaretoken]').val();
    let id1 = id
    if (action) {
        $.ajax({
            url: "delete/",
            method: 'POST',
            data: {
                'id': id1,
                'csrfmiddlewaretoken': csr
            },
            dataType: 'json',
            success: function(data) {
                if (data.deleted) {
                    $('#tr' + id1).remove()
                }
            }
        });
    }
}

function updateUser(user) {
    let id1 = $('#id' + user).val()
    let email = $('#email' + user).text()
    let password = $('#password' + user).text()
    $('#form-id').val(user)
    $('#form-email').val(email)
    $('#form-password').val(password)
}

$('#saveChanges').click(function() {
    let id1 = $('#form-id').val()
    let email = $('#form-email').val().trim()
    let password = $('#form-password').val().trim()
    let csr = $('input[name=csrfmiddlewaretoken]').val();
    if (email && password) {
        $.ajax({
            url: "updatedata/",
            method: 'POST',
            data: {
                'id': id1,
                'email': email,
                'password': password,
                'csrfmiddlewaretoken': csr
            },
            dataType: 'json',
            success: function(data) {
                $('#email' + id1).text(data.email)
                $('#password' + id1).text(data.password)
                $('form')[1].reset()
                $('#myModal').hide();
            }
        });
    }

})
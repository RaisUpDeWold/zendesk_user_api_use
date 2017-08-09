$(document).ready(function () {
  $('#createEndUserForm').submit (function () {
    $(this).ajaxSubmit({
      error: function(xhr) {
        status('Error: ' + xhr.status);
        $('#createEndUser_FirstName').focus();
      },
      success: function(res) {
        alert("End user is created successfully!");
        $('#createEndUser_FirstName').text('');
        $('#createEndUser_LastName').text('');
        $('#createEndUser_EMail').text('');
        $('#createEndUser_Phone').text('');
        $('#createEndUser_BusinessName').text('');
        $('#createEndUser_Submit').enable();
      }
    });
    return false;
  });

  $('#modifyEndUserForm').submit (function () {
    $(this).ajaxSubmit({
      error: function(xhr) {
        status('Error: ' + xhr.status);
        $('#modifyEndUser_EMail').focus();
      },
      success: function(res) {
        alert("End user is modified successfully!");
      }
    });
    return false;
  });

  $('#deleteEndUserForm').submit (function () {
    $(this).ajaxSubmit({
      error: function(xhr) {
        status('Error: ' + xhr.status);
        $('#deleteEndUser_UserID').focus();
      },
      success: function(res) {
        alert("End user is deleted successfully!");
      }
    });
    return false;
  });
});

$(document).ready(function () {
  if ($("#sortable").length) {
    $("#sortable").sortable();
    $("#sortable").disableSelection();
  }

  if ($("#content_area").length) {
    CKEDITOR.replace('content');
  }
});
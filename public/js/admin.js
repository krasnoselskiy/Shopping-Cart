$(document).ready(function () {
  if ($("#sortable").length) {
    $("#sortable").sortable();
    $("#sortable").disableSelection();
  }

  if ($("#content_area").length) {
    CKEDITOR.replace('content');
  }

  if ($(".confirmDeletion").length) {
    $(".confirmDeletion").on('click', () => {
      if (!confirm('Confirm deletion')) return false;
    })
  }
});
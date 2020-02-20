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

  if ($(".table").length) {
    $("tbody").sortable({
      items: "tr:not('.home')",
      placeholder: "ui-state-hightlight",
      update: function () {
        var ids = $("tbody").sortable("serialize");
        var url = "/admin/pages/reorder-page";

        $.post(url, ids);
      }
    });
  }
});
checkboxs = $('input[type="checkbox"]');
checkboxs.each(function ()
{
    this.addEventListener('change', function ()
    {
        div = $(`#${this.value}`);
        div.toggleClass('hide');
    });
});
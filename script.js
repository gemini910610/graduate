date = new Date();
month = date.getMonth() + 1;
day = date.getDate();

september = $('#september tbody');
tr = $('<tr></tr>');
for (i = -4; i <= 30; i++)
{
    td = $('<td></td>');
    div = $('<div></div>');
    if (i >= 1)
    {
        td.attr('id', `sep-${i}`);
        div.text(i);
    }
    td.append(div);
    tr.append(td);
    if (i % 7 == 2)
    {
        september.append(tr);
        tr = $('<tr></tr>');
    }
}

october = $('#october tbody');
tr = $('<tr></tr>');
for (i = 1; i <= 35; i++)
{
    td = $('<td></td>');
    div = $('<div></div>');
    if (i <= 31)
    {
        td.attr('id', `oct-${i}`);
        div.text(i);
    }
    td.append(div);
    tr.append(td);
    if (i % 7 == 0)
    {
        october.append(tr);
        tr = $('<tr></tr>');
    }
}

november = $('#november tbody');
tr = $('<tr></tr>');
for (i = -2; i <= 32; i++)
{
    td = $('<td></td>');
    div = $('<div></div>');
    if (i >= 1 && i <= 30)
    {
        td.attr('id', `nov-${i}`);
        div.text(i);
    }
    td.append(div);
    tr.append(td);
    if (i % 7 == 4)
    {
        november.append(tr);
        tr = $('<tr></tr>');
    }
}

if (month == 9) today = $(`#sep-${day}`);
else if (month == 10) today = $(`#oct-${day}`);
else if (month == 11) today = $(`#nov-${day}`);
today.addClass('today');

skip = ['ncu'];
schools = ['ntue', 'ncku', 'ncu', 'ccu', 'nchu', 'nsysu'];
schools.forEach(school =>
{
    if (skip.includes(school)) return;
    $.ajax({
        type: 'get',
        url: `data/${school}.json`,
        async: false,
        dataType: 'json',
        success: label_date
    });
});

remind = $('.remind');
console.log(month)
if (month == 9) todo = $(`#sep-${day} p`);
else if (month == 10) todo = $(`oct-${day} p`);
else if (month == 11) todo = $(`nov-${day} p`);
todo = todo.clone();
if (todo.length > 0) remind.append(todo);
else remind.append('<p>無</p>');

function label_date(data)
{
    school = data.name;
    abbr = data.abbr;
    p = $('<p></p>');
    p.addClass(abbr);
    p.text(school);
    $('.legend').append(p);

    dates = Object.keys(data.dates);
    dates.forEach(date => {
        d = date.split('/');
        if (d[0] == '9') d[0] = 'sep';
        else if (d[0] == '10') d[0] = 'oct';
        else if (d[0] == '11') d[0] = 'nov';
        td = $(`#${d.join('-')}`);
        data.dates[date].forEach(todo =>
        {
            p = $('<p></p>');
            p.addClass(abbr);
            p.text(`${todo}`);
            td.append(p);
        })
    });
}

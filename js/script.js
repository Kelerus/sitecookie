$(document).ready(function() {

    if($.cookie('auth') == null) {
        $('.register_check').css("display", "flex");
        $('.main').hide();
    }
    else {

        let jpoauth = JSON.parse($.cookie('auth'));

        $('.header_login').text(jpoauth.login);
        
        $('header').show();
        $('.main').show();
    }

    $('#regbutton').click(function() {
        let oauth = {
            login: `${$('#exampleInputEmail1').val()}`,
            password: `${$('#exampleInputPassword1').val()}`,
            auth: `${Math.random()}`
        }
        let joauth = JSON.stringify(oauth);
        $.cookie('auth', joauth);
    })

    $('#createbtn').click(function() {
        if($('.create_table').attr('num_show') == '1'){
            $('.create_table').hide();
            $('.create_table').removeAttr('num_show');
        }
        else {
            $('.create_table').show();
            $('.create_table').attr('num_show', '1');
        }
    })

    
        if($.cookie('i') == null) {
            let i = 0;
            $.cookie('i', i);
        }
        else {
            for (let index = 0; index < $.cookie('i'); index++) {
                let element = JSON.parse($.cookie(`table${index}`));
                if(element != null){
                    $('.table__items').append(element);
                }
            }
        }

    


    $('#log').click(function() {
        let i = $.cookie('i')
        let tablei = Number(i);
        
        let odata = {
            name: `${$('#inputname').val()}`,
            surName: `${$('#inputsurname').val()}`,
            number: `${$('#inputnumber').val()}`
        }

        let tabledata = $('.table__items').attr('table_data', tablei);

        if(tabledata >= '1') {
            let hs = 
            `<tr id="items-${tablei}">
            <th scope="row">${tablei}</th>
            <td>${odata.name}</td>
            <td>${odata.surName}</td>
            <td>${odata.number}</td>
            <td><input numid="${tablei}" class="btntabledelete btn btn-danger" type="submit" value="Удалить"></td>
            </tr>`
            let html1 = $('.table__items').append(`
                <tr id="items-${tablei}">
                    <th scope="row">${tablei}</th>
                    <td>${odata.name}</td>
                    <td>${odata.surName}</td>
                    <td>${odata.number}</td>
                    <td><input numid="${tablei}" class="btntabledelete btn btn-danger" type="submit" value="Удалить"></td>
                </tr>
            `)
            let jhtml = JSON.stringify(hs);
            $.cookie(`table${tablei++}`, jhtml);
            $.cookie('i', tablei);
            console.log(tablei);
        }
        else {
            let html = $('.table__items').html(`
            <tr id="items-${tablei}">
            <th scope="row">${tablei}</th>
            <td>${odata.name}</td>
            <td>${odata.surName}</td>
            <td>${odata.number}</td>
            <td><input numid="${tablei}" class="btntabledelete btn btn-danger" type="submit" value="Удалить"></td>
            </tr>
            `)
            let jhtml = JSON.stringify(html);
            $.cookie(`table${tablei++}`, jhtml);
            $.cookie('i', tablei);
            console.log(tablei);
        }
    })

    $('.btntabledelete').click(function() {
        let cookiei = $.cookie('i');
        let _this = $(this);
        let id = _this.attr('numid');
        $(`#items-${id}`).remove();
        $.removeCookie(`table${id}`);
        let deletei = cookiei - 1;
        cookiei = $.cookie('i', deletei);
    })

})
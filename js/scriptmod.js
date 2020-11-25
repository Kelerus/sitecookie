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

    if($.cookie('id') == null || $.cookie('masscookie') == null) {
        let id = 0;
        let masscookie = "";
        $.cookie('id', id);
        $.cookie('masscookie', masscookie);
    }

    if($.cookie('masscookie') != "") {
        let masscookie = $.cookie('masscookie') 
        let arrmasscookie = masscookie.split(',');
        try{
            arrmasscookie.forEach(function(element, index) {
                if(element != null) {
                    if(element == arrmasscookie[index]) {
                        let tablecookie = $.cookie(`${element}`);
                        let parsetable = JSON.parse(tablecookie);
                        $('.table__items').append(parsetable);
                    }
                }
            });
        }
        catch {
            
        }
    }


    $('#log').click(function() {
        let id = $.cookie('id');
        let masscookie = $.cookie('masscookie');
        

        if(masscookie == "") {
            
            let masscookieid = `table${id}`
            $.cookie('masscookie', masscookieid);
            
        }
        else {

            let masscookieid = `table${id}`
            masscookie += `,${masscookieid}`
            $.cookie('masscookie', masscookie);

        }
        
        let odata = {
            name: `${$('#inputname').val()}`,
            surName: `${$('#inputsurname').val()}`,
            number: `${$('#inputnumber').val()}`
        }
        let html = 
            `<tr id="items-${id}">
            <th scope="row">${id}</th>
            <td>${odata.name}</td>
            <td>${odata.surName}</td>
            <td>${odata.number}</td>
            <td><input numid="${id}" class="btntabledelete btn btn-danger" type="submit" value="Удалить"></td>
            </tr>`

        $('.table__items').append(html);
        

        let jhtml = JSON.stringify(html);
        $.cookie(`table${id++}`, jhtml);
        $.cookie('id', id);
    })

    $('.btntabledelete').click(function() {
        let numid = $(this).attr('numid');
        $(`.items-${numid}`).remove();
        let masscookie = $.cookie('masscookie');
        let arrmasscookie = masscookie.split(',');
        arrmasscookie.forEach(function(element) {
            if(element == `table${numid}`) {
                if(arrmasscookie.length == 1) {
                    $.removeCookie('masscookie');
                }
                let id = $.cookie('id');
                id = id-1;
                arrmasscookie.splice(numid, 1);
                console.log(arrmasscookie.length);
                $.cookie('id', id);
                $.cookie('masscookie', arrmasscookie);
                
            }
        });
        $.removeCookie(`table${numid}`);
    })
})
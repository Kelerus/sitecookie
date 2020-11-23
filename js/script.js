
$(document).ready(function() {
    var i;
    let cookie = $.cookie('user');
    if(cookie == null) {
        $('.register').show();
        $('.main').hide();
    }
    else {
        $('.register').hide();
        $('.main').show();

        
        if(!$.cookie('i') == "") {
            i = Number($.cookie('i'));
            
        }
        else {
            i = 0;
        }

        for (let index = 1; index <= i; index++) {
            let element = $.cookie(`table${index}`);
            if(!element == "") {
                $('.table__items').append(element);
                element = null;
            }
        }
    }

    $('#regbutton').on('click', function() {
        let email = $('#exampleInputEmail1').val();
        $('.register').hide();
        $.cookie('user', email);
    })

    $('#log').click(function() {
        let name = $('#inputname').val();
        let surName = $('#inputsurname').val();
        let number = $('#inputnumber').val();
        let mass = {
            name: '',
            surName: '',
            number: ''
        };
        mass.name = name;
        mass.surName = surName;
        mass.number = number;
        i++;
        let html = $('.table__items').html(`
        <tr id="a${i}">
        <th scope="row">${i}</th>
        <td>${mass.name}</td>
        <td>${mass.surName}</td>
        <td>${mass.number}</td>
        <td><button num_id="${i}" class="deletebtn">Удалить</button></td>
        </tr>`);
        let json;
        for (let key of html) {
            json = JSON.stringify(key.innerHTML);
        }
        $.cookie('i', i);
        $.cookie(`table${i}`, json);
    })


    
    $('.deletebtn').click(function() {
        let _this = $(this);
        let num_id = _this.attr("num_id");
        $(`#a${num_id}`).remove();
        $.removeCookie(`table${num_id}`);
    })
})


let content = $('#card')
let load = $('#loader')
let layoutConfirm = $('#layout')
let buttonDelete = $('#delete')
let buttonRandom = $('#search')
let buttonFavories = $('#stockage')
let buttonsCheckbox = $('input[type="checkbox"]')
let timeOut = 2000

layoutConfirm.hide()
load.show()
content.hide()
buttonDelete.hide()

buttonsCheckbox.on('change', function () {

    $('.type-animal').find('input[name="animal_type"]').not(this).prop('checked', false).parent().removeClass('active-animal')
    $('input[name="animal_type"]:checked').parent().addClass('active-animal')

});

setTimeout(function () {
    $.get(`https://cat-fact.herokuapp.com/facts/random`)
        .done(function (data) {
            render([data])
            load.hide()
            content.show()
        })
        .fail(function () {
            load.hide()
            content.html('<h3>An error occurred, please try again later. </h3>')
            content.show()
        })
}, timeOut)

buttonRandom.click(function () {

    load.show()
    content.hide()
    buttonDelete.hide()
    content.html('')

    let getData = {
        'amount': $('input[name=amount]').val(),
        'animal_type': $('input[name=animal_type]:checked').val(),
    };

    setTimeout(function () {
        $.get(`https://cat-fact.herokuapp.com/facts/random`, getData)

            .done(function (data) {

                if (data.length > 1) {
                    render(data)
                } else {
                    render([data])
                }

                load.hide()
                content.show()
            })
            .fail(function () {
                load.hide()
                content.html('<h3>An error occurred, please try again later. </h3>')
                content.show()
            })
    }, timeOut)

});

buttonDelete.click(function () {

    layoutConfirm.show()

    setTimeout(function (event) {
        let resp = confirm('Are you sure you want to delete ?');
        if (!resp) {
            layoutConfirm.hide()
            event.preventDefault();
        }

        sessionStorage.clear()
        layoutConfirm.hide()
        favorite()

    }, 100);

})

buttonFavories.click(favorite);

document.querySelector('input[type="range"]').addEventListener('input', function () {
    $('#value p').text(this.value)
})

function action(element) {

    if (element.checked) {

        let tab = sessionStorage.getItem('stokage')

        if (tab) {
            let newTab = tab.split(',')
            newTab.push(element.value)
            sessionStorage.setItem('stokage', newTab);
        } else {
            sessionStorage.setItem('stokage', element.value)
        }

    } else {

        let tab = sessionStorage.getItem('stokage').split(',')
        tab.splice(tab.indexOf(element.value), 1)

        sessionStorage.clear()
        sessionStorage.setItem('stokage', tab)

    }
}

function favorite() {

    load.show()
    content.hide()
    content.html('')
    buttonDelete.show()

    setTimeout(function () {

        let idStorage = sessionStorage.getItem('stokage')

        if (idStorage === null || idStorage[0] === undefined) {

            load.hide()
            content.html('<h3>No entry !! Choose yours facts favories </h3>')
            content.show()

        } else {

            let tab = idStorage.split(',')


            for (let i = 0; i < tab.length; i++) {
                $.get(`https://cat-fact.herokuapp.com/facts/${tab[i]}`)
                    .done(function (data) {

                        render([data], tab[i])

                        if (i === tab.length - 1) {
                            load.hide()
                            content.show()
                        }
                    })
                    .fail(function () {
                        load.hide()
                        content.html('<h3>An error occurred, please try again later. </h3>')
                        content.show()
                    })
            }
        }
    }, timeOut)
}

function render(data, id = '') {

    for (let i = 0; i < data.length; i++) {

        let testChecked = false;

        if (id) {
            testChecked = (data[i]._id === id)
        } else {

            let idStorage = sessionStorage.getItem('stokage')

            if (idStorage) {
                testChecked = idStorage.split(',')
                testChecked.includes(data[i]._id)
            }

            testChecked = false
        }
        let date = data[i].updatedAt.split('T')[0].split('-').reverse().join("-")

        content.append(`
            <div class="fact">
                <input type="checkbox" name="stock" onchange="action(this)" value="${data[i]._id}"
                    ${(testChecked) ? 'checked' : ''}
                >
                <div>
                    <p>${data[i].text}</p>
                    <em>${date}</em>
                </div>   
            </div>
        `)
    }
}
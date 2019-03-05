$(function () {

    var $addAuthorForm = $('#authorAdd');
    var $authorList = $('#authorsList');
    var $authorEditSelect = $('#authorEditSelect');
    var $authorEditForm = $('#authorEdit');

    $addAuthorForm.on('submit', function (event) {
        event.preventDefault();

        var name = $('#name').val();
        var surname = $('#surname').val();
        var description = $('#description').val();

        var newAuthor = {
            name: name,
            surname: surname,
            description: description
        };

        $
            .ajax({
                url: '../rest/rest.php/author',
                type: 'POST',
                dataType: 'json',
                data: newAuthor
            })
            .done(function (response) {
                renderAuthor(response.success[0]);
                renderEditSelect(response.success[0]);


            })
            .fail(function (error) {
                console.log('Create author error', error);
            });
    });

    //shows Edit form after choosing a book
    $authorEditSelect.on('change', function () {
        var id = $(this).val();

        $.ajax({
            url: '../rest/rest.php/author/' + id,
            type: 'GET'
        })
            .done(function (response) {

                //reference directly to the element,
                var authorId = $authorEditForm.find('#id');
                var authorName = $authorEditForm.find('#name');
                var authorSurname = $authorEditForm.find('#surname');
                var authorDescription = $authorEditForm.find('#description');


                //use val() instead of .text() to add value to input it into element
                authorId.val(response.success[0].id);
                authorName.val(response.success[0].name);
                authorSurname.val(response.success[0].surname);
                authorDescription.val(response.success[0].description);

                $authorEditForm.slideDown();

            })
            .fail(function (error) {
                console.log('Edit author error', error);
            });
    });


    $('body').on('click', '.btn-book-show-description', function () {
        var id = $(this).data('id');
        var that = $(this);
        $
            .ajax({
                url: '../rest/rest.php/author/' + id,
                type: 'GET'
            })
            .done(function (response) {
                var descElement = that.closest('.list-group-item').find('.book-description');

                descElement.text(response.success[0].description);
                descElement.slideToggle();
            })
            .fail(function (error) {
                console.log('Show author description error', error);
            });
    });

    $('body').on('click', '.btn-book-remove', function () {
        var id = $(this).data('id');
        var that = $(this);

        $
            .ajax({
                url: '../rest/rest.php/author/' + id,
                type: 'DELETE'
            })
            .done(function () {
                that.closest('.list-group-item').remove();
                $authorEditSelect.find("option[value=\"" + id + "\"]").remove();

            })
            .fail(function (error) {
                console.log('Delete author error', error);
            });
    });

    //selector of '.on' method ('.bookEditForm) should be pointing to the nearest parent element to avoid overlapping on other page elements
    $('body').on('submit', '#authorEdit', function (element) {

        element.preventDefault();
        var id = $(this).find('#id').val();

        console.log(id);

        var authorName = $authorEditForm.find('#name').val();
        var authorSurname = $authorEditForm.find('#surname').val();
        var authorDesc = $authorEditForm.find('#description').val();


        var editedAuthor = {
            name: authorName,
            surname: authorSurname,
            description: authorDesc
        };

        console.log('Ajax');
        //ajax query - edits book title and/or description in db
        $.ajax({
            url: '../rest/rest.php/author/' + id,
            type: 'PATCH',
            data: editedAuthor
        })
            .done(function (response) {
                console.log('done, author id: ' + id + " edited in db");
                $authorEditForm.slideUp();

                //here should edit the relevant id in books list
                console.log(id);
                //updates relevant existing book list title
                var $authorList = $('[class="authorTitle"][data-id=' + id + ']');
                $authorList.text(response.success[0].name + " " + response.success[0].surname);


            })
            .fail(function (error) {
                console.log('Fail');
                console.log('Edit book error', error);
                console.log(JSON.stringify(error));
            });

    })

    function renderAuthor(author) {
        var string = `<li class="list-group-item">
                <div class="panel-heading">
                <span class="authorTitle" data-id="${author.id}">${author.name} ${author.surname}</span>
            <button data-id="${author.id}"
        class="btn btn-danger pull-right btn-xs btn-book-remove"><i
        class="fa fa-trash"></i>
                </button>
                <button data-id="${author.id}"
        class="btn btn-success pull-right btn-xs btn-book-show-books"><i
        class="fa fa-book"></i>
                </button>
                <button data-id="${author.id}"
        class="btn btn-primary pull-right btn-xs btn-book-show-description"><i
        class="fa fa-info-circle"></i>
                </button>
                </div>
                <div class="panel-body book-description"></div>
                <div class="panel-body author-books"></div>
                </li>`;

        $authorList.html($authorList.html() + string);
    }

    function renderEditSelect(author) {
        var string = `<option value="${author.id}">${author.name} ${author.surname}</option>`;
        $authorEditSelect.html($authorEditSelect.html() + string);
    }

    function getAuthors() {
        $
            .ajax({
                url: '../rest/rest.php/author',
                type: 'GET'
            })
            .done(function (response) {
                for (var i = 0; i < response.success.length; i++) {
                    renderAuthor(response.success[i]);
                    renderEditSelect(response.success[i]);

                }
            })
            .fail(function (error) {
                console.log('Create author error', error);
            });
    }

    $('body').on('click', '.btn-book-show-books', function () {

        var author_id = $(this).data('id');
        var that = $(this);
        $
            .ajax({
                url: '../rest/rest.php/author/' + author_id,
                type: 'GET'
            })
            .done(function (response) {
                var descElement = that.closest('.list-group-item').find('.author-books');

                var $authorBooks = response.success[0].books;

                console.log($authorBooks);

                descElement.empty();

                $.each($authorBooks, function(key, value) {
                    console.log(value.title);
                    var string = `<div value="${value.id}">${value.title}</div>`;
                    descElement.html(descElement.html() + string);

                });

                descElement.slideToggle();

            })
            .fail(function (error) {
                console.log('Show author description error', error);
            });
    });

    getAuthors();



});
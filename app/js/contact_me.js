$(function() {

    $(".contactForm input,.contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            $form.find("[type=submit]").prop("disabled", true).button('loading'); //prevent submit behaviour and display preloading
            // get values from FORM
            var form             = $form.attr("name");
            var name             = $form.find("[name=name]").val();
            var email            = $form.find("[name=email]").val();
            var phone            = $form.find("[name=phone]").val();
            var message          = $form.find("[name=message]").val();
            var carMark          = $form.find("[name=car_mark]").val();
            var carModel         = $form.find("[name=car_model]").val();
            var carGeneration    = $form.find("[name=car_generation]").val();
            var carSerie         = $form.find("[name=car_serie]").val();
            var carModification  = $form.find("[name=car_modification]").val();
            var sparePart        = $form.find("[name=spare_part]").val();
            var position1        = $form.find("[name=position1]:checked").siblings().find('.radio-group__text').text();
            var position2        = $form.find("[name=position2]:checked").siblings().find('.radio-group__text').text();
            var position3        = $form.find("[name=position3]:checked").siblings().find('.radio-group__text').text();
            var position4        = $form.find("[name=position4]:checked").siblings().find('.radio-group__text').text();
            var carVin           = $form.find("[name=car_vin]").val();

            $.ajax({
                url: "././mail/mail.php",
                type: "POST",
                data: {
                    form: form,
                    name: name,
                    phone: phone,
                    email: email,  
                    message: message,
                    carMark: carMark,
                    carModel: carModel,
                    carGeneration: carGeneration,
                    carSerie: carSerie,
                    carModification: carModification,
                    sparePart: sparePart,
                    position1: position1,
                    position2: position2,
                    position3: position3,
                    position4: position4,
                    carVin: carVin
                },
                cache: false,
                success: function() {
                    // Success message
                    $form.find('.success').html("<div class='alert alert-success'>");
                    $form.find('.success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $form.find('.success > .alert-success')
                        .append("<strong>Ваше сообщение успешно отправлено. В ближайшее время наши менеджеры свяжутся с вами! </strong>");
                    $form.find('.success > .alert-success')
                        .append('</div>');

                    // remove prevent submit behaviour and disable preloading
                    $form.find("[type=submit]").prop("disabled", false).button('reset');  

                    //clear all fields
                    $form.trigger("reset");
                },
                error: function() {
                    // Fail message
                    $form.find('.success').html("<div class='alert alert-danger'>");
                    $form.find('.success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $form.find('.success > .alert-danger').append("<strong>Приносим свои извинения, но наш почтовый сервер времено не работает. Попробуйте, отправить сообщение еще раз и сообщите нам о проблеме!");
                    $form.find('.success > .alert-danger').append('</div>');

                    // remove prevent submit behaviour and disable preloading
                    $form.find("[type=submit]").prop("disabled", false).button('reset'); 

                    //clear all fields
                    $form.trigger("reset");
                },
            })
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('.success').html('');
});

/**
 * Created by wissile on 11/5/14.
 */

//init of wow.js
new WOW().init();


// collapse when click on signup button
$(function() {
    $( "#signupscroll" ).accordion({
        active: false,
        collapsible: true
    });
});







// Ajax signup

//
//            var fname = $( "#fname" ),
//                     lname = $( "#lname" ),
//            email = $( "#email" ),
//            password = $( "#password" );
//
//
//    var usrInfo = JSON.stringify({
//        firstName: fname.val(),
//        lastName: lname.val(),
//        password: password.val(),
//        email: email.val()
//    });
//
//    sendUser(usrInfo);
//
//    function sendUser(usrInfo) {
//        var user = usrInfo;
//        var urlAjax =  "http://easyparkapp.herokuapp.com/api/users";
//
//        $.ajax({
//            type: "POST",
//            url: urlAjax,
//            contentType: "application/json",
//            data: user,
//            success: function(data) { alert("ajax worked"); },
//            error: function(data) {alert("ajax error"); },
//            dataType: 'json'
//        });
//    }


// Auto scroll when click on footer
$(document).ready(function(){
    var scroll_pos = 0;

    if(($(window).width()+15)<600) {
        var tabs = $('.footer').position();

        $(window).scroll(function () {
            scroll_pos = $(this).scrollTop();

            if ((scroll_pos + 54) >= tabs.top) {
                $('.footer').addClass('stick');
            } else {
                $('.footer').removeClass('stick');
            }
        });

        //page nav
        $(".more-action").click(function () {
            $('body').animate({
                scrollTop: 5550
            }, 'slow');
        });
    } else {
        var tabs = $('.footer').position();

        $(window).scroll(function () {
            scroll_pos = $(this).scrollTop();

            if ((scroll_pos + 54) >= tabs.top) {
                $('.footer').addClass('stick');
            } else {
                $('.footer').removeClass('stick');
            }
        });

        //page nav
        $(".more-action").click(function () {
            $('body').animate({
                scrollTop: 3050
            }, 'slow');
        });
    }
});














$(function() {
    var dialog, form,

    // From http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#e-mail-state-%28type=email%29
        emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        name = $( "#name" ),
        email = $( "#email" ),
        password = $( "#password" ),
        allFields = $( [] ).add( name ).add( email ).add( password ),
        tips = $( ".validateTips" );

    function updateTips( t ) {
        tips
            .text( t )
            .addClass( "ui-state-highlight" );
        setTimeout(function() {
            tips.removeClass( "ui-state-highlight", 1500 );
        }, 500 );
    }

    function checkLength( o, n, min, max ) {
        //if ( o.val().length > max || o.val().length < min ) {
        //    o.addClass( "ui-state-error" );
        //    updateTips( "Length of " + n + " must be between " +
        //    min + " and " + max + "." );
        //    return false;
        //} else {
        //    return true;
        //}
        return true;
    }

    function checkRegexp( o, regexp, n ) {
        if ( !( regexp.test( o.val() ) ) ) {
            o.addClass( "ui-state-error" );
            updateTips( n );
            return false;
        } else {
            return true;
        }
    }

    function addUser() {
        var valid = true;
        allFields.removeClass( "ui-state-error" );

        valid = valid && checkLength( name, "username", 3, 16 );
        valid = valid && checkLength( email, "email", 6, 80 );
        valid = valid && checkLength( password, "password", 5, 16 );

        valid = valid && checkRegexp( name, /^[a-z]([0-9a-z_\s])+$/i, "Username may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
        valid = valid && checkRegexp( email, emailRegex, "eg. ui@jquery.com" );
        valid = valid && checkRegexp( password, /^([0-9a-zA-Z])+$/, "Password field only allow : a-z 0-9" );


        if ( valid ) {
            var usrInfo = JSON.stringify({
                firstName: name.val(),
                lastName: name.val(),
                password: password.val(),
                email: email.val()
            });
            dialog.dialog( "close" );
        }
        sendUser(usrInfo);
        return valid;
    }

    dialog = $( "#dialog-form" ).dialog({
        autoOpen: false,
        height: 300,
        width: 350,
        modal: true,
        buttons: {
            "Create an account": addUser,
            Cancel: function() {
                dialog.dialog( "close" );
            }
        },
        close: function() {
            form[ 0 ].reset();
            allFields.removeClass( "ui-state-error" );
        }
    });

    form = dialog.find( "form" ).on( "submit", function( event ) {
        event.preventDefault();
        addUser();
    });

    $( "#create-user" ).button().on( "click", function() {
        dialog.dialog( "open" );
    });
});

function sendUser(usrInfo) {
    var user = usrInfo;
    var urlAjax =  "http://easyparkapp.herokuapp.com/api/users";

    $.ajax({
        type: "POST",
        url: urlAjax,
        contentType: "application/json",
        data: user,
        success: function(data) { alert("ajax worked"); },
        error: function(data) {alert("ajax error"); },
        dataType: 'json'
    });
}




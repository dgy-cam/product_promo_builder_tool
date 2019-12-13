$(function(){



    var form_html = '<div class="product additional">\
        <div class="pod">\
            <label for="">Product handle</label>\
            <input type="text" class="handle">\
        </div>\
        <div class="pod">\
            <label for="">Product ID</label>\
            <input type="text" class="product_id">\
        </div>\
        <div class="pod">\
            <label for="">Variant ID (if needed)</label>\
            <input type="text" class="variant_id">\
        </div>\
        <div class="pod">\
            <label for="">Quantity to add</label>\
            <input type="text" class="quantity">\
        </div>\
        <div class="remove">&times;</div>\
    </div>';



    $('.spec ul').on('click', '.add_spec', function() {
        var el = $(this);
        var parent = el.parents('ul');
        parent.append('<li><input type="text" class="spec_var"><button class="add_spec">+</button><button class="remove_spec">-</button></li>');
    });

    $('.spec ul').on('click', '.remove_spec', function() {
        var el = $(this);
        var parent = el.parents('li');
        parent.remove();
    });

    $('fieldset').on('click', '.remove', function() {
        $(this).parents('.product').remove();
    });

    $('.clear').on('click',function() {
        var r = confirm("Are you sure? This can't be undone.");
        if (r == true) {
            $('input[type="text"]').val('');
        }
    });

    $('[name="type"]').on('change',function() {
        slide_spec();
    });
    $(document).ready(function() {
        slide_spec();
    });

    function slide_spec(){
        if($('#single2').is(':checked')) {
            $('.spec').slideDown(200);
        } else {
            $('.spec').slideUp(200);
        }

        if($('#bundle').is(':checked')) {
            $('.plus').show();
            $('.additional').slideDown(200);
        } else {
            $('.plus').hide();
            $('.additional').slideUp(200);
        }
    }



    $('.build').on('click',function(){

        var title = $('.title').val().toString();
        var button = $('.button').val().toString();
        var type = $('input[name=type]:checked').val().toString();
        var type_check = $('input[name=type]:checked').val().toString();
        var arr_str = [];

        $('.product').each(function(){
            var p = $(this);
            var product = {};
            product.handle = p.find('.handle').val().toString() || null;
            if (product.handle) {
                product.pid = parseInt(p.find('.product_id').val());
                product.vid = parseInt(p.find('.variant_id').val());
                product.quantity = parseInt(p.find('.quantity').val()) || 1;


                var pa = [];

                pa.push(product.handle);

                if (product.vid) {
                    pa.push(product.vid);
                } else {
                    pa.push(product.pid);
                }

                pa.push(product.quantity);

                console.log(type);
                // if specific variants are defined
                if($('#single2').is(':checked')) {
                    var spec = p.find('.spec ul');
                    var spec_vids = [];
                    spec.children('li').each(function(){
                        var val = parseInt($(this).children('input').val());

                        if (val) {
                            spec_vids.push(val);
                        }
                    });
                    if (spec_vids.length > 0) {
                        pa.push(spec_vids);
                    }
                }

                arr_str.push(pa);
            } else {
                alert('Ermmm...you need to put some data in goober.');
            }

            if ($('#bundle').is(':checked')) {
                return true;
            } else {
                return false;
            }


        });

        console.log(arr_str);
        console.log(JSON.stringify(arr_str));
        var arr_str = JSON.stringify(arr_str).replace(/"/g,"'");
        console.log(arr_str);
        var payload = '';

        payload += '<div class="build-product"';

        payload += ' data-products="'+arr_str+'"';

        if (title) {
            payload += ' data-title="'+title+'"';
        }
        if($('#single2').is(':checked')) {
            payload += ' data-variants="true"';
        }
        if (button) {
            payload += ' data-button="'+button+'"';
        }

        payload += ' data-layout="'+type+'"'

        payload += '></div>';


        $('.output pre code').text(payload);
    });
    $('fieldset').on('click', '.plus',function(){
        $('.product_holder').append(form_html);
    });
















});

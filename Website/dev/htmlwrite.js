function makeImg( a, b, c, parent )
{
    if (typeof c === 'undefined')
    {
        element = createElement( "img", a, "" );
    }
    else
    {
        element = createElement( "img" , a, c );
    }

    var image = document.createAttribute("src");
    element.setAttributeNode(image);
    image.value = b;

    createElementP2( element, parent );
}

function createElementP2( element, parent )
{
    if (typeof parent === 'undefined')
    {
        document.body.appendChild(element);
    }
    else
    {
        document.getElementById(parent).appendChild(element);
    }
}

function createElement( type, id_value, style_value )
{
    var element = document.createElement( type );
    var id = document.createAttribute("id");
    var style = document.createAttribute("style");
    style.value = style_value;
    id.value = id_value;
    element.setAttributeNode(id);
    element.setAttributeNode(style);


    return element;
}
function makeDiv( a, b, parent )
{
    element = createElement( "div", a, b );
    createElementP2( element, parent );
}

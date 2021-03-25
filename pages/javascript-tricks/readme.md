# Javascript Tricks

### Using Javascript to run code generated at runtime

The following pattern is known as a `function` constructor which accepts the code in the format of a string. It is very useful if we generate code at runtime.

<div id="flems" class="flems-wrapper"></div>
<style>
  #flems .runtime { display: none !important; }
  #flems.flems-wrapper { height: 300px; }
</style>
<script> 
    window.Flems(flems, {
    files: [],  
    links: [{
        name: 'script.js',
        type: 'js',
        url: new URL("script.js", document.baseURI).href
    }],
        middle          : 100,
        shareButton     : false,
        selected        : 'script.js',
        console         : false,
    })
</script>
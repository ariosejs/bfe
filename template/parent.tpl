<!doctype html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>{% block title %}{% endblock %}</title>
        {% block styles %}
        <link rel="stylesheet" href="/r/c/{@appname@}.css" type="text/css" media="screen" />
        <link rel="stylesheet" href="/r/c/bui.css" type="text/css" media="screen" />
        {% endblock %}
        <base href="/{@appname@}/" />
    </head>
    <body>
        <header>
            <h1>BUI<small>ChunBo UI</small></h1>
            <nav>
                <ul>
                    <li><a href="/index.html">Component Library</a></li>
                    <li><a href="/demo.html">Demo</a></li>
                </ul>
            </nav>
        </header>
        {% block content %}

        {% endblock %}
        <footer></footer>
    </body>
    <script type="text/javascript" src="/r/j/global.js"></script>
    <script type="text/javascript" src="/r/j/bui.js"></script>
    {% block scripts %}
    <script type="text/javascript" src="/r/j/{@appname@}.js"></script>
    {% endblock %}    
</html>


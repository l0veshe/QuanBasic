<!-- /views/admin/master.html -->

<!doctype html>

<html>
<head>

  <title>{% block title %}Default title{% endblock %}  {{region}}</title>

  {% include 'layouts/head.tpl' %}

  {% block head %}{% endblock %}

  {% include 'layouts/head2.tpl' %}



</head>

<body class="hold-transition skin-blue sidebar-mini">

  <div class="wrapper">
    {% include 'layouts/main-header.tpl' %}

    {% include 'layouts/main-menu-bar.tpl' %}

    {% block content %}{% endblock %}

    {% include 'layouts/main-footer.tpl' %}
  </div>

  {% include 'layouts/foot.tpl' %}

  {% block footer %}{% endblock %}
</body>
</html>

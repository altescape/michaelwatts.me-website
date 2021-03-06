---
layout: plain-post
title:  "How to update plugins on a locally installed version of WordPress on OSX"
description: "When developing a site in WordPress on a local machine - you can't initially update the plugins with FTP. This article shows you how to do it."
date:   2014-10-30 09:38:25
thumb: cover14-thumb.jpg
categories: terminal bash wordpress
comments: true
---

Complete all steps and ***then change ownership back to you*** otherwise you won't be able to edit anything.

----

#### Before updating

Add following code to wp-config.php
{% highlight php %}
define('FS_METHOD','direct');
{% endhighlight %}

Change ownership and permissions of entire wp-content folder to apache owner
{% highlight bash %}
sudo chown -R _www wp-content; sudo chmod -R g+w wp-content
{% endhighlight %}

Go to WordPress admin and update your plugins

----

#### After updating

Comment out the line in wp-config.php
{% highlight php %}
# define('FS_METHOD','direct');
{% endhighlight %}

Change ownership back to originial owner:group and change permissions back to default 755
{% highlight bash %}
sudo chown -R michaelwatts:wheel wp-content; sudo chmod -R 755 wp-content
{% endhighlight %}

Change ownership and permissions of uploads directory back to apache owner so _www can upload/edit
{% highlight bash %}
sudo chown -R _www wp-content/uploads; sudo chmod -R g+w wp-content/uploads
{% endhighlight %}

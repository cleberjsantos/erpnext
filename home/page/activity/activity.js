wn.pages['activity'].onload = function(wrapper) {
	wrapper.appframe = new wn.ui.AppFrame($(wrapper).find('.layout-appframe'));
	wrapper.appframe.title('Activity');
	
	var list = new wn.ui.Listing({
		appframe: wrapper.appframe,
		method: 'home.page.activity.activity.get_feed',
		parent: $('#activity-list'),
		render_row: function(row, data) {
			new erpnext.ActivityFeed(row, data);
		}
	});
	list.run();
	
	// Build Report Button
	if(wn.boot.profile.can_get_report.indexOf("Feed")!=-1) {
		wrapper.appframe.add_button('Build Report', function() {
			wn.set_route('Report2', "Feed");
		}, 'icon-th')
	}
}

erpnext.last_feed_date = false;
erpnext.ActivityFeed = Class.extend({
	init: function(row, data) {
		this.scrub_data(data);
		this.add_date_separator(row, data);
		$(row).append(repl('<div style="margin: 0px">\
			%(avatar)s \
			<span %(onclick)s class="label %(add_class)s">%(feed_type)s</span>\
			%(link)s %(subject)s <span class="user-info">%(by)s</span></div>', data));
			
		$(row).find(".avatar img").centerImage();
	},
	scrub_data: function(data) {
		data.by = wn.user_info(data.owner).fullname;
		data.avatar = wn.avatar(data.owner);
		
		// feedtype
		if(!data.feed_type) {
			data.feed_type = get_doctype_label(data.doc_type);
			data.add_class = "label-info";
			data.onclick = repl('onclick="window.location.href=\'#!List/%(feed_type)s\';"', data)
		}
		
		// color for comment
		if(data.feed_type=='Comment') {
			data.add_class = "label-important";
		}
		
		if(data.feed_type=='Assignment') {
			data.add_class = "label-warning";
		}
		
		// link
		if(data.doc_name && data.feed_type!='Login') {
			data.link = repl('<a href="#!Form/%(doc_type)s/%(doc_name)s">%(doc_name)s</a>', data)
		}
		
		if(!data.link) data.link = "";
	},
	add_date_separator: function(row, data) {
		var date = dateutil.str_to_obj(data.modified);
		var last = erpnext.last_feed_date;
		
		if((last && dateutil.obj_to_str(last) != dateutil.obj_to_str(date)) || (!last)) {
			var diff = dateutil.get_day_diff(new Date(), date);
			if(diff < 1) {
				pdate = 'Today';
			} else if(diff < 2) {
				pdate = 'Yesterday';
			} else {
				pdate = dateutil.global_date_format(date);
			}
			$(row).html(repl('<div class="date-sep">%(date)s</div>', {date: pdate}));
		}
		erpnext.last_feed_date = date;
	}
})
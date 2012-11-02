// ERPNext - web based ERP (http://erpnext.com)
// Copyright (C) 2012 Web Notes Technologies Pvt Ltd
// 
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

wn.require("app/accounts/doctype/purchase_taxes_and_charges_master/purchase_taxes_and_charges_master.js");
wn.require("public/app/js/buying.js");
// wn.require('app/utilities/doctype/sms_control/sms_control.js');

wn.provide("erpnext.buying");

erpnext.buying.SupplierQuotation = erpnext.Buying.extend({
	// onload_post_render: function() {
	// 	this.get_item_defaults();
	// },
	refresh: function() {
		this._super();
	},
	toggle_fields: function() {
		this.frm.toggle_display("contact_section", this.frm.doc.supplier);
	},
	set_labels: function() {
		
	},
	
	// validate: function() {
	// 	this.is_table_empty("purchase_request_items");
	// },
	// posting_date: function() {
	// 	if(this.frm.doc.__islocal && this.frm.doc.posting_date) {
	// 		// on change of posting date, update schedule date
	// 		this.set_schedule_date("purchase_request_items");
	// 	}
	// },
	// qty: function(doc, cdt, cdn) {
	// 	// warn if qty < min order qty
	// 	var child = locals[cdt][cdn];
	// 	if(flt(child.qty) < flt(child.min_order_qty)) {
	// 		msgprint(repl("Warning: \
	// 			Requested Quantity is less than Minimum Order Quantity \
	// 			for Item: %(item_code)s at row # %(idx)s", 
	// 			{ item_code: child.item_code, idx: child.idx }));
	// 	}
	// },
	// get_item_defaults: function() {
	// 	if(this.frm.doc.__islocal && wn.model.has_children(this.frm.doc.doctype,
	// 			this.frm.doc.name, "purchase_request_items")) {
	// 		$c_obj(wn.model.get_doclist(this.frm.doc.doctype, this.frm.doc.name),
	// 			"set_item_defaults", null, function(r) {
	// 				refresh_field("purchase_request_items");
	// 			});
	// 	}
	// },
	add_buttons: function() {
		var me = this;
		
		if(this.frm.doc.docstatus == 1) {
			this.frm.add_custom_button("Make Purchase Order",
				function() { me.make_purchase_order(this); });
		}
	},
	make_purchase_order: function(btn) {
		wn.model.map_doclist([["Supplier Quotation", "Purchase Order",
			["Supplier Quotation Item", "Purchase Order Item"],
			["Purchase Taxes and Charges", "Purchase Taxes and Charges"]]],
			this.frm.doc.name)
	}
	send_sms: function(me) {
		// TODO
	},
	load_precision_maps: function() {
		// TODO
		// if(!this.frm.precision) this.frm.precision = {};
		// this.frm.precision.main = wn.model.get_precision_map("Purchase Request");
		// this.frm.precision.item = wn.model.get_precision_map("Purchase Request Item");
	}
})

cur_frm.cscript = new erpnext.buying.SupplierQuotation({
	frm: cur_frm, item_table_field: "supplier_quotation_items"});
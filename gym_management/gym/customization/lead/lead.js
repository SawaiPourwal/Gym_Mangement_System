frappe.ui.form.on("Lead", {
    custom_trial_start_date: function(frm) {
        validate_trial(frm);
    },
    custom_trail_type: function(frm) {
        validate_trial(frm);
    },
    custom_date_of_birth: function(frm) {
        // frappe.throw("Fetching Price List Rate...");
        Calculate_date_of_birth_age(frm);
    }

});

// yah function jab trial demo ko selct karte ha to uske liye
function validate_trial(frm) {
    if (frm.doc.custom_trial_start_date && frm.doc.custom_trail_type) {
        let days = parseInt(frm.doc.custom_trail_type);
        let custom_trial_end_date = frappe.datetime.add_days(
            frm.doc.custom_trial_start_date,days
        );
        frm.set_value("custom_trial_end_date", custom_trial_end_date);
    }
}

// yah function automatic age calculate ke liye
function Calculate_date_of_birth_age(frm){
    if (frm.doc.custom_date_of_birth){
        let dob = frm.doc.custom_date_of_birth;
        let today = frappe.datetime.get_today();
        let age = frappe.datetime.get_diff(today, dob)/365;
        frm.set_value("custom_age", Math.floor(age));
    }
}
      

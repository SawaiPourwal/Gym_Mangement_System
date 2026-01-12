// frappe.pages['gym-member-dashboard'].on_page_load = function (wrapper) {
//     const page = frappe.ui.make_app_page({
//         parent: wrapper,
//         title: 'Gym Member Dashboard',
//         single_column: true
//     });
//     $(`<style>
//         .gym-card {
//             border-radius: 12px;
//             box-shadow: 0 4px 12px rgba(0,0,0,0.08);
//             background: #fff;
//         }

//         .gym-card h4 {
//             font-weight: 600;
//             margin-bottom: 15px;
//         }

//         .gym-table th {
//             background: #f5f7fa;
//             font-size: 13px;
//         }

//         .gym-table td {
//             font-size: 13px;
//         }

//         .no-data {
//             text-align: center;
//             color: #999;
//             font-style: italic;
//         }
//     </style>`).appendTo("head");

//     const customer_field = frappe.ui.form.make_control({
//         parent: page.main,
//         df: {
//             label: "User Id",
//             fieldtype: "Link",
//             fieldname: "customer",
//             options: "Customer",
//             reqd: 1,
//             onchange() {
//                 const customer = customer_field.get_value();
//                 if (customer) fetch_fitness_data(customer);
//             }
//         },
//         render_input: true
//     });
//     page.main.append(`
//         <hr>
//         <div id="fitness-data" class="mt-3">
//             <p>Select customer</p>
//         </div>
//     `);

//     frappe.call({
//         method: "gym_management.gym.page.gym_member_dashboard.gym_member_dashboard.get_customer_from_logged_user",
//         callback: function (r) {
//             if (r.message) {
//                 customer_field.set_value(r.message);
//             }
//         }
//     });
//     function fetch_fitness_data(customer) {
//         frappe.call({
//             method: "gym_management.gym.page.gym_member_dashboard.gym_member_dashboard.get_customer_fitness_data",
//             args: { cus: customer },
//             callback(r) {
//                 if (!r.message) {
//                     $("#fitness-data").html("<p>No data found</p>");
//                     return;
//                 }
//                 render(r.message[0], r.message[1]);
//             }
//         });
//     }
//     function render(workout, diet) {

//         const workout_rows = workout.length
//             ? workout.map(r => `
//                 <tr>
//                     <td>${r.days || ""}</td>
//                     <td>${r.muscle_groups || ""}</td>
//                     <td>${r.exercise}</td>
//                     <td>${r.sets}</td>
//                     <td>${r.reps}</td>
//                 </tr>`).join("")
//             : `<tr><td colspan="4" class="no-data">No workout</td></tr>`;

//         const diet_rows = diet.length
//             ? diet.map(r => `
//                 <tr>
//                     <td>${r.day}</td>
//                     <td>${r.meal_type}</td>
//                     <td>${r.food_item}</td>
//                     <td>${r.quantity || ""}</td>
//                     <td>${r.calories || ""}</td>
//                 </tr>`).join("")
//             : `<tr><td colspan="5" class="no-data">No diet</td></tr>`;

//         $("#fitness-data").html(`
//             <div class="row">

//                 <!-- Workout -->
//                 <div class="col-lg-6 col-md-6">
//                     <div class="card gym-card p-3 mb-3">
//                         <h4 style = text-align:center> Workout Plan</h4>
//                         <table class="table table-bordered gym-table">
//                             <thead>
//                                 <tr>
//                                     <th>Day</th>
//                                     <th>Muscle</th>
//                                     <th>Exercise</th>
//                                     <th>Sets</th>
//                                     <th>Reps</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 ${workout_rows}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>

//                 <!-- Diet -->
//                 <div class="col-lg-6 col-md-6">
//                     <div class="card gym-card p-3 mb-3">
//                         <h4 style = text-align:center> Diet Plan</h4>
//                         <table class="table table-bordered gym-table">
//                             <thead>
//                                 <tr>
//                                     <th>Day</th>
//                                     <th>Meal</th>
//                                     <th>Food</th>
//                                     <th>Qty</th>
//                                     <th>Calories</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 ${diet_rows}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>

//             </div>
//         `);
//     }
// };


// frappe.pages['gym-member-dashboard'].on_page_load = function (wrapper) {

//     const page = frappe.ui.make_app_page({
//         parent: wrapper,
//         title: 'Gym Member Dashboard',
//         single_column: true
//     });

//     /* ---------------- DAYS ---------------- */
//     const days = [
//         "Sunday", "Monday", "Tuesday",
//         "Wednesday", "Thursday", "Friday", "Saturday"
//     ];
//     const today = days[new Date().getDay()];

//     /* ---------------- STYLE ---------------- */
//     $(`
//         <style>
//             .gym-filter-row {
//                 display: flex;
//                 gap: 20px;
//                 margin-bottom: 20px;
//             }

//             .gym-filter-row .control-input {
//                 min-width: 250px;
//             }

//             .gym-card {
//                 border-radius: 12px;
//                 box-shadow: 0 6px 18px rgba(0,0,0,0.08);
//                 background: #fff;
//             }

//             .gym-card h4 {
//                 font-weight: 600;
//                 margin-bottom: 15px;
//             }

//             .gym-table th {
//                 background: #f4f6f9;
//                 font-size: 13px;
//             }

//             .gym-table td {
//                 font-size: 13px;
//             }
//         </style>
//     `).appendTo("head");

//     /* ---------------- FILTER ROW ---------------- */
//     const filter_row = $('<div class="gym-filter-row"></div>').appendTo(page.main);

//     /* ---------------- CUSTOMER FIELD ---------------- */
//     const customer_field = frappe.ui.form.make_control({
//         parent: filter_row,
//         df: {
//             label: "Customer",
//             fieldtype: "Link",
//             fieldname: "customer",
//             options: "Customer",
//             reqd: 1
//         },
//         render_input: true
//     });

//     /* ---------------- DAY FIELD ---------------- */
//     const day_field = frappe.ui.form.make_control({
//         parent: filter_row,
//         df: {
//             label: "Day",
//             fieldtype: "Select",
//             fieldname: "day",
//             options: days.join("\n"),
//             reqd: 1,
//             default: today,
//             onchange() {
//                 load_workout();
//             }
//         },
//         render_input: true
//     });

//     page.main.append(`<div id="workout-area"></div>`);

//     /* ---------------- AUTO SET CUSTOMER ---------------- */
//     frappe.call({
//         method: "gym_management.gym.page.gym_member_dashboard.gym_member_dashboard.get_logged_customer",
//         callback(r) {
//             if (r.message) {
//                 customer_field.set_value(r.message);

//                 // ✅ ensure today is selected
//                 day_field.set_value(today);

//                 load_workout();
//             }
//         }
//     });

//     /* ---------------- LOAD WORKOUT ---------------- */
//     function load_workout() {

//         const customer = customer_field.get_value();
//         const day = day_field.get_value();

//         if (!customer || !day) return;

//         frappe.call({
//             method: "gym_management.gym.page.gym_member_dashboard.gym_member_dashboard.get_customer_workout_by_day",
//             args: {
//                 customer: customer,
//                 day: day
//             },
//             callback(r) {
//                 render_table(r.message || []);
//             }
//         });
//     }

//     /* ---------------- RENDER TABLE ---------------- */
//     function render_table(data) {

//         if (!data.length) {
//             $("#workout-area").html(
//                 `<p class="text-muted text-center mt-4">No workout for this day</p>`
//             );
//             return;
//         }

//         let rows = data.map(d => `
//             <tr>
//                 <td>${d.exercise}</td>
//                 <td class="text-center">${d.sets}</td>
//                 <td class="text-center">${d.reps}</td>
//             </tr>
//         `).join("");

//         $("#workout-area").html(`
//             <div class="card gym-card p-3 mt-3">
//                 <h4 class="text-center">${data[0].template} Workout</h4>
//                 <table class="table table-bordered gym-table">
//                     <thead>
//                         <tr>
//                             <th>Exercise</th>
//                             <th class="text-center">Sets</th>
//                             <th class="text-center">Reps</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         ${rows}
//                     </tbody>
//                 </table>
//             </div>
//         `);
//     }
// };



frappe.pages['gym-member-dashboard'].on_page_load = function (wrapper) {

    /* ---------- PAGE ---------- */
    const page = frappe.ui.make_app_page({
        parent: wrapper,
        title: 'Gym Member Dashboard',
        single_column: true
    });

    /* ---------- CSS (LOAD ONLY ONCE) ---------- */
    if (!document.getElementById("gym-dashboard-style")) {
        $(`<style id="gym-dashboard-style">
            .gym-card {
                border-radius: 14px;
                box-shadow: 0 6px 18px rgba(0,0,0,0.08);
                background: #fff;
            }

            .gym-table thead {
                background: #f4f6f8;
                font-size: 13px;
            }

            .gym-table td,
            .gym-table th {
                font-size: 13px;
                vertical-align: middle;
            }

            .gym-table tbody tr:hover {
                background: #f9fafb;
            }

            .section-title {
                font-weight: 600;
                margin-bottom: 12px;
                text-align: center;
            }
        </style>`).appendTo("head");
    }

    /* ---------- DAY ---------- */
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const today = days[new Date().getDay()];

    /* ---------- FILTER ROW ---------- */
    const filter_row = $(`
        <div class="row mb-4">
            <div class="col-md-6" id="customer-col"></div>
            <div class="col-md-6" id="day-col"></div>
        </div>
    `).appendTo(page.main);

    const customer_field = frappe.ui.form.make_control({
        parent: $("#customer-col"),
        df: {
            label: "Customer",
            fieldtype: "Link",
            fieldname: "customer",
            options: "Customer",
            reqd: 1,
            onchange: load_data
        },
        render_input: true
    });

    const day_field = frappe.ui.form.make_control({
        parent: $("#day-col"),
        df: {
            label: "Day",
            fieldtype: "Select",
            fieldname: "day",
            options: days.join("\n"),
            default: today,
            reqd: 1,
            onchange: load_data
        },
        render_input: true
    });

    page.main.append(`<div id="data-area"></div>`);

    /* ---------- AUTO LOAD LOGGED CUSTOMER ---------- */
    frappe.call({
        method: "gym_management.gym.page.gym_member_dashboard.gym_member_dashboard.get_logged_customer",
        callback(r) {
            if (r.message) {
                customer_field.set_value(r.message);
                day_field.set_value(today);
                load_data();
            }
        }
    });

    /* ---------- LOAD DATA ---------- */
    function load_data() {
        if (!customer_field.get_value() || !day_field.get_value()) return;

        frappe.call({
            method: "gym_management.gym.page.gym_member_dashboard.gym_member_dashboard.get_customer_workout_by_day",
            args: {
                customer: customer_field.get_value(),
                day: day_field.get_value()
            },
            callback(r) {
                render_tables(r.message || {});
            }
        });
    }

    /* ---------- RENDER TABLES ---------- */
    function render_tables(data) {

        let workout = data.workout || [];
        let diet = data.diet || [];

        let workout_heading = workout.length ? workout[0].template : "Workout Plan";

        let workout_rows = workout.length
            ? workout.map(r => `
                <tr>
                    <td>${r.exercise}</td>
                    <td>${r.sets}</td>
                    <td>${r.reps}</td>
                </tr>
            `).join("")
            : `
                <tr>
                    <td colspan="3" class="text-center text-muted">
                        No workout available
                    </td>
                </tr>
            `;

        let diet_rows = diet.length
            ? diet.map(r => `
                <tr>
                    <td>${r.meal_type}</td>
                    <td>${r.food_item}</td>
                    <td>${r.quantity}</td>
                    <td>${r.calories}</td>
                </tr>
            `).join("")
            : `
                <tr>
                    <td colspan="4" class="text-center text-muted">
                        No diet available
                    </td>
                </tr>
            `;

        $("#data-area").html(`
            <div class="row">

                <!-- WORKOUT -->
                <div class="col-md-6 mb-3">
                    <div class="card gym-card p-3">
                        <h4 class="section-title">${workout_heading}</h4>

                        <table class="table table-bordered gym-table">
                            <thead>
                                <tr>
                                    <th>Workout</th>
                                    <th>Sets</th>
                                    <th>Reps</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${workout_rows}
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- DIET -->
                <div class="col-md-6 mb-3">
                    <div class="card gym-card p-3">
                        <h4 class="section-title">Diet Plan</h4>

                        <table class="table table-bordered gym-table">
                            <thead>
                                <tr>
                                    <th>Meal</th>
                                    <th>Food</th>
                                    <th>Qty</th>
                                    <th>Calories</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${diet_rows}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        `);
    }
};

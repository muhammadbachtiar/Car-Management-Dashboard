$(document).ready( function () {
    $('#listOrderTable').DataTable({
        searching: false,
        info: false,
        lengthMenu: [[10, 25, 50, 100], [10, 25, 50, 100]], 
        dom: '<"table-responsive-md"t><"dataTables_length"l><"dataTables_paginate paging_simple_numbers"p>',
        language: {
            "paginate": {
                "previous": "<<",
                "next": ">>"
            },
            "lengthMenu":   'Limit \n<select>'+
                                '<option value="10">10</option>'+
                                '<option value="25">25</option>'+
                                '<option value="50">50</option>'+
                                '<option value="100">100</option>'+
                            '</select> '
        }
    });
} );

$(document).ready( function () {
    $('#listCarTable').DataTable({
        searching: false,
        info: false,
        lengthMenu: [[10, 25, 50, 100], [10, 25, 50, 100]], 
        dom: '<"table-responsive-md"t><"dataTables_length"l><"dataTables_paginate paging_simple_numbers"p>',
        language: {
            "paginate": {
                "previous": "<<",
                "next": ">>"
            },
            "lengthMenu":   'Limit \n<select>'+
                                '<option value="10">10</option>'+
                                '<option value="25">25</option>'+
                                '<option value="50">50</option>'+
                                '<option value="100">100</option>'+
                            '</select> '
        }
    });
} );
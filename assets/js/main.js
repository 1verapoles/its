$(document).ready(function() {
    var calendarEl = document.getElementById('calendar');
    var result1 = $('.result1');
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      locale: 'ru',
      dateClick: function(dat) {
        if (!$('td[data-date=' + dat.dateStr + ']').find('.addinfo').length) {
            alert('Эта дата уже забронирована!'); return;
        }
        $("#date").val(dat.dateStr);
        $('.modal').modal('show');
        $( ".form" ).submit(function( event ) {
            event.preventDefault();
            var th = $(this);
            var st =  $("#date").val();
            var en =  +$("#days").val();
            var date1 = new Date(st);
            var sum = 0;
            for (var i = 0; i < en; i++) {
                //console.log(i);
                var date2 = new Date();
               var param = new Date(date2.setDate(date1.getDate() + i)).toISOString().slice(0, 10);
              // console.log(param);
               var addinfo = $('td[data-date=' + param + ']').find('.addinfo');
               //console.log(addinfo);
               if (!addinfo.length) {alert("Эта дата уже забронирована! Ваша заявка не принята!"); return;}
               sum += Number(addinfo.text());
               addinfo.remove();
            }
            //console.log(sum);
            result1.val(sum);
            calendar.addEvent({
                title: $('#name').val(),
                start: st,
                end: new Date(date1.setDate(date1.getDate() + en)),
                allDay: true
              });
           jQuery.ajax({
                url: th.attr("action"),
                type: 'post',
                data: th.serialize()          
            }).done(function() {
                alert("Ваша заявка принята! Стоимость бронирования " + sum);
            setTimeout(function() {
                th.trigger("reset");
            }, 3000);
            $('.modal').modal('hide');
            });
          });
      }
    });
    calendar.render();
    $( ".fc-daygrid-day.fc-day-mon, .fc-daygrid-day.fc-day-tue, .fc-daygrid-day.fc-day-wed, .fc-daygrid-day.fc-day-thu, .fc-daygrid-day.fc-day-fri" ).append( "<div class='addinfo'>10</div>" );
    $( " .fc-daygrid-day.fc-day-sat, .fc-daygrid-day.fc-day-sun" ).append( "<div class='addinfo'>30</div>" );

    

     });   

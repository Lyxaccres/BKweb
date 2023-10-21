import { Calendar } from 'antd';
import type { CalendarMode } from 'antd/es/calendar/generateCalendar';
import type { Dayjs } from 'dayjs';
import React from 'react';

const onPanelChange = (value: Dayjs, mode: CalendarMode) => {
  console.log(value.format('YYYY-MM-DD'), mode);
};

function Calen({width=300,height=300}){
        
//   const { token } = theme.useToken();

  const wrapperStyle: React.CSSProperties = {
    width,
    height,
    //border: `1px solid  rgb(240, 240, 240)`,
    borderRadius: 8,
  };

  return (
    <div style={wrapperStyle}>
      <Calendar fullscreen={false} onPanelChange={onPanelChange} />
    </div>
  );
}

export default Calen;
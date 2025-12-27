function SetTimeClock() {
  return (
    <div className="relative shrink-0 size-[25px]" data-name="Set time clock">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 25">
        <g id="Set time clock">
          <rect fill="white" height="25" width="25" />
          <circle cx="12.5" cy="12.5" id="Ellipse 1116" r="11.5" stroke="var(--stroke-0, #1C2C42)" strokeWidth="2" />
          <path d="M12 8V13L14.5 15.5" id="Vector" stroke="var(--stroke-0, #1C2C42)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-[194.875px]">
      <SetTimeClock />
      <p className="font-['Lato:Bold',sans-serif] leading-[23px] not-italic relative shrink-0 text-[#1c2c42] text-[17px] text-nowrap">Set date</p>
      <p className="font-['Lato:Bold',sans-serif] leading-[23px] not-italic relative shrink-0 text-[#4784f8] text-[17px] text-nowrap">Oct 2nd</p>
    </div>
  );
}

function SettingSliderButtonLrg() {
  return (
    <div className="h-[30px] relative shrink-0 w-[56px]" data-name="Setting slider button - lrg">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 56 30">
        <g id="Setting slider button - lrg">
          <rect fill="var(--fill-0, #4784F8)" height="30" rx="15" width="56" />
          <circle cx="41" cy="15" fill="var(--fill-0, white)" id="Ellipse 117" r="11.25" />
        </g>
      </svg>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex items-center justify-between pb-[16px] pt-0 px-0 relative shrink-0 w-full">
      <Frame3 />
      <SettingSliderButtonLrg />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[3px] items-center relative shrink-0 text-nowrap">
      <p className="font-['SF_Pro:Semibold',sans-serif] font-[590] leading-[normal] relative shrink-0 text-[17px] text-black tracking-[-0.2px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        October 2025
      </p>
      <div className="flex flex-col font-['SF_Compact:Semibold',sans-serif] font-[656.2] justify-center leading-[0] relative shrink-0 text-[#0088fe] text-[15px]">
        <p className="leading-[20px] text-nowrap">􀆊</p>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex font-['SF_Compact:Semibold',sans-serif] font-[656.2] items-center justify-between leading-[normal] relative shrink-0 text-[#0088fe] text-[21px] text-nowrap w-[58px]">
      <p className="relative shrink-0">􀆉</p>
      <p className="relative shrink-0">􀆊</p>
    </div>
  );
}

function Top() {
  return (
    <div className="content-stretch flex items-center justify-between pb-[16px] pt-0 px-0 relative shrink-0 w-[316px]" data-name="top">
      <Frame />
      <Frame1 />
    </div>
  );
}

function DatepickerDay() {
  return (
    <div className="[grid-area:2_/_3] content-stretch flex flex-col h-[42px] items-center justify-center justify-self-stretch relative rounded-[99px] shrink-0" data-name="datepicker-day">
      <p className="font-['SF_Compact:Medium',sans-serif] font-[556] leading-[normal] relative shrink-0 text-[20px] text-black text-center w-full">1</p>
    </div>
  );
}

function DatepickerDay1() {
  return (
    <div className="[grid-area:2_/_4] bg-[#08f] content-stretch flex flex-col h-[42px] items-center justify-center justify-self-stretch relative rounded-[99px] shrink-0" data-name="datepicker-day">
      <p className="font-['SF_Compact:Medium',sans-serif] font-[556] leading-[normal] relative shrink-0 text-[20px] text-center text-white w-full">2</p>
    </div>
  );
}

function DatepickerDay2() {
  return (
    <div className="[grid-area:2_/_5] content-stretch flex flex-col h-[42px] items-center justify-center justify-self-stretch relative rounded-[99px] shrink-0" data-name="datepicker-day">
      <p className="font-['SF_Compact:Medium',sans-serif] font-[556] leading-[normal] relative shrink-0 text-[20px] text-black text-center w-full">3</p>
    </div>
  );
}

function DatepickerDay3() {
  return (
    <div className="[grid-area:2_/_6] content-stretch flex flex-col h-[42px] items-center justify-center justify-self-stretch relative rounded-[99px] shrink-0" data-name="datepicker-day">
      <p className="font-['SF_Compact:Medium',sans-serif] font-[556] leading-[normal] relative shrink-0 text-[20px] text-black text-center w-full">4</p>
    </div>
  );
}

function DatepickerDay4() {
  return (
    <div className="[grid-area:2_/_7] content-stretch flex flex-col h-[42px] items-center justify-center justify-self-stretch relative rounded-[99px] shrink-0" data-name="datepicker-day">
      <p className="font-['SF_Compact:Medium',sans-serif] font-[556] leading-[normal] relative shrink-0 text-[20px] text-black text-center w-full">5</p>
    </div>
  );
}

function DatepickerDay5() {
  return (
    <div className="[grid-area:3_/_1] content-stretch flex flex-col h-[42px] items-center justify-center justify-self-stretch relative rounded-[99px] shrink-0" data-name="datepicker-day">
      <p className="font-['SF_Compact:Medium',sans-serif] font-[556] leading-[normal] relative shrink-0 text-[20px] text-black text-center w-full">6</p>
    </div>
  );
}

function DatepickerDay6() {
  return (
    <div className="[grid-area:3_/_2] content-stretch flex flex-col h-[42px] items-center justify-center justify-self-stretch relative rounded-[99px] shrink-0" data-name="datepicker-day">
      <p className="font-['SF_Compact:Medium',sans-serif] font-[556] leading-[normal] relative shrink-0 text-[20px] text-black text-center w-full">7</p>
    </div>
  );
}

function DatepickerDay7() {
  return (
    <div className="[grid-area:3_/_3] content-stretch flex flex-col h-[42px] items-center justify-center justify-self-stretch relative rounded-[99px] shrink-0" data-name="datepicker-day">
      <p className="font-['SF_Compact:Medium',sans-serif] font-[556] leading-[normal] relative shrink-0 text-[20px] text-black text-center w-full">8</p>
    </div>
  );
}

function DatepickerDay8() {
  return (
    <div className="[grid-area:3_/_4] content-stretch flex flex-col h-[42px] items-center justify-center justify-self-stretch relative rounded-[99px] shrink-0" data-name="datepicker-day">
      <p className="font-['SF_Compact:Medium',sans-serif] font-[556] leading-[normal] relative shrink-0 text-[20px] text-black text-center w-full">9</p>
    </div>
  );
}

function DatepickerDay9() {
  return (
    <div className="[grid-area:3_/_5] content-stretch flex flex-col h-[42px] items-center justify-center justify-self-stretch relative rounded-[99px] shrink-0" data-name="datepicker-day">
      <p className="font-['SF_Compact:Medium',sans-serif] font-[556] leading-[normal] relative shrink-0 text-[20px] text-black text-center w-full">10</p>
    </div>
  );
}

function DatepickerDay10() {
  return (
    <div className="[grid-area:3_/_6] content-stretch flex flex-col h-[42px] items-center justify-center justify-self-stretch relative rounded-[99px] shrink-0" data-name="datepicker-day">
      <p className="font-['SF_Compact:Medium',sans-serif] font-[556] leading-[normal] relative shrink-0 text-[20px] text-black text-center w-full">11</p>
    </div>
  );
}

function DatepickerDay11() {
  return (
    <div className="[grid-area:3_/_7] content-stretch flex flex-col h-[42px] items-center justify-center justify-self-stretch relative rounded-[99px] shrink-0" data-name="datepicker-day">
      <p className="font-['SF_Compact:Medium',sans-serif] font-[556] leading-[normal] relative shrink-0 text-[20px] text-black text-center w-full">12</p>
    </div>
  );
}

function DatepickerDay12() {
  return (
    <div className="[grid-area:4_/_1] content-stretch flex flex-col h-[42px] items-center justify-center justify-self-stretch relative rounded-[99px] shrink-0" data-name="datepicker-day">
      <p className="font-['SF_Compact:Medium',sans-serif] font-[556] leading-[normal] relative shrink-0 text-[20px] text-black text-center w-full">13</p>
    </div>
  );
}

function DatepickerDay13() {
  return (
    <div className="[grid-area:4_/_2] content-stretch flex flex-col h-[42px] items-center justify-center justify-self-stretch relative rounded-[99px] shrink-0" data-name="datepicker-day">
      <p className="font-['SF_Compact:Medium',sans-serif] font-[556] leading-[normal] relative shrink-0 text-[20px] text-black text-center w-full">14</p>
    </div>
  );
}

function DatepickerDay14() {
  return (
    <div className="[grid-area:4_/_3] content-stretch flex flex-col h-[42px] items-center justify-center justify-self-stretch relative rounded-[99px] shrink-0" data-name="datepicker-day">
      <p className="font-['SF_Compact:Medium',sans-serif] font-[556] leading-[normal] relative shrink-0 text-[20px] text-black text-center w-full">15</p>
    </div>
  );
}

function DatepickerDay15() {
  return (
    <div className="[grid-area:4_/_4] content-stretch flex flex-col h-[42px] items-center justify-center justify-self-stretch relative rounded-[99px] shrink-0" data-name="datepicker-day">
      <p className="font-['SF_Compact:Medium',sans-serif] font-[556] leading-[normal] relative shrink-0 text-[20px] text-black text-center w-full">16</p>
    </div>
  );
}

function DatepickerDay16() {
  return (
    <div className="[grid-area:4_/_5] content-stretch flex flex-col h-[42px] items-center justify-center justify-self-stretch relative rounded-[99px] shrink-0" data-name="datepicker-day">
      <p className="font-['SF_Compact:Medium',sans-serif] font-[556] leading-[normal] relative shrink-0 text-[20px] text-black text-center w-full">17</p>
    </div>
  );
}

function DatepickerDay17() {
  return (
    <div className="[grid-area:4_/_6] content-stretch flex flex-col h-[42px] items-center justify-center justify-self-stretch relative rounded-[99px] shrink-0" data-name="datepicker-day">
      <p className="font-['SF_Compact:Medium',sans-serif] font-[556] leading-[normal] relative shrink-0 text-[20px] text-black text-center w-full">18</p>
    </div>
  );
}

function DatepickerDay18() {
  return (
    <div className="[grid-area:4_/_7] content-stretch flex flex-col h-[42px] items-center justify-center justify-self-stretch relative rounded-[99px] shrink-0" data-name="datepicker-day">
      <p className="font-['SF_Compact:Medium',sans-serif] font-[556] leading-[normal] relative shrink-0 text-[20px] text-black text-center w-full">19</p>
    </div>
  );
}

function DatepickerDay19() {
  return (
    <div className="[grid-area:5_/_1] content-stretch flex flex-col h-[42px] items-center justify-center justify-self-stretch relative rounded-[99px] shrink-0" data-name="datepicker-day">
      <p className="font-['SF_Compact:Medium',sans-serif] font-[556] leading-[normal] relative shrink-0 text-[20px] text-black text-center w-full">20</p>
    </div>
  );
}

function DatepickerDay20() {
  return (
    <div className="[grid-area:5_/_2] content-stretch flex flex-col h-[42px] items-center justify-center justify-self-stretch relative rounded-[99px] shrink-0" data-name="datepicker-day">
      <p className="font-['SF_Compact:Medium',sans-serif] font-[556] leading-[normal] relative shrink-0 text-[20px] text-black text-center w-full">21</p>
    </div>
  );
}

function DatepickerDay21() {
  return (
    <div className="[grid-area:5_/_3] content-stretch flex flex-col h-[42px] items-center justify-center justify-self-stretch relative rounded-[99px] shrink-0" data-name="datepicker-day">
      <p className="font-['SF_Compact:Medium',sans-serif] font-[556] leading-[normal] relative shrink-0 text-[20px] text-black text-center w-full">22</p>
    </div>
  );
}

function DatepickerDay22() {
  return (
    <div className="[grid-area:5_/_4] content-stretch flex flex-col h-[42px] items-center justify-center justify-self-stretch relative rounded-[99px] shrink-0" data-name="datepicker-day">
      <p className="font-['SF_Compact:Medium',sans-serif] font-[556] leading-[normal] relative shrink-0 text-[20px] text-black text-center w-full">23</p>
    </div>
  );
}

function DatepickerDay23() {
  return (
    <div className="[grid-area:5_/_5] content-stretch flex flex-col h-[42px] items-center justify-center justify-self-stretch relative rounded-[99px] shrink-0" data-name="datepicker-day">
      <p className="font-['SF_Compact:Medium',sans-serif] font-[556] leading-[normal] relative shrink-0 text-[20px] text-black text-center w-full">24</p>
    </div>
  );
}

function DatepickerDay24() {
  return (
    <div className="[grid-area:5_/_6] content-stretch flex flex-col h-[42px] items-center justify-center justify-self-stretch relative rounded-[99px] shrink-0" data-name="datepicker-day">
      <p className="font-['SF_Compact:Medium',sans-serif] font-[556] leading-[normal] relative shrink-0 text-[20px] text-black text-center w-full">25</p>
    </div>
  );
}

function DatepickerDay25() {
  return (
    <div className="[grid-area:5_/_7] content-stretch flex flex-col h-[42px] items-center justify-center justify-self-stretch relative rounded-[99px] shrink-0" data-name="datepicker-day">
      <p className="font-['SF_Compact:Medium',sans-serif] font-[556] leading-[normal] relative shrink-0 text-[20px] text-black text-center w-full">26</p>
    </div>
  );
}

function DatepickerDay26() {
  return (
    <div className="[grid-area:6_/_1] content-stretch flex flex-col h-[42px] items-center justify-center justify-self-stretch relative rounded-[99px] shrink-0" data-name="datepicker-day">
      <p className="font-['SF_Compact:Medium',sans-serif] font-[556] leading-[normal] relative shrink-0 text-[20px] text-black text-center w-full">27</p>
    </div>
  );
}

function DatepickerDay27() {
  return (
    <div className="[grid-area:6_/_2] content-stretch flex flex-col h-[42px] items-center justify-center justify-self-stretch relative rounded-[99px] shrink-0" data-name="datepicker-day">
      <p className="font-['SF_Compact:Medium',sans-serif] font-[556] leading-[normal] relative shrink-0 text-[20px] text-black text-center w-full">28</p>
    </div>
  );
}

function DatepickerDay28() {
  return (
    <div className="[grid-area:6_/_3] content-stretch flex flex-col h-[42px] items-center justify-center justify-self-stretch relative rounded-[99px] shrink-0" data-name="datepicker-day">
      <p className="font-['SF_Compact:Medium',sans-serif] font-[556] leading-[normal] relative shrink-0 text-[20px] text-black text-center w-full">29</p>
    </div>
  );
}

function DatepickerDay29() {
  return (
    <div className="[grid-area:6_/_4] content-stretch flex flex-col h-[42px] items-center justify-center justify-self-stretch relative rounded-[99px] shrink-0" data-name="datepicker-day">
      <p className="font-['SF_Compact:Medium',sans-serif] font-[556] leading-[normal] relative shrink-0 text-[20px] text-black text-center w-full">30</p>
    </div>
  );
}

function DatepickerDay30() {
  return (
    <div className="[grid-area:6_/_5] content-stretch flex flex-col h-[42px] items-center justify-center justify-self-stretch relative rounded-[99px] shrink-0" data-name="datepicker-day">
      <p className="font-['SF_Compact:Medium',sans-serif] font-[556] leading-[normal] relative shrink-0 text-[20px] text-black text-center w-full">31</p>
    </div>
  );
}

function Month() {
  return (
    <div className="gap-[6px] grid grid-cols-[42px_42px_42px_42px_42px_42px_42px] grid-rows-[16px_42px_42px_42px_42px_42px] pb-0 pt-[9px] px-0 relative shrink-0 w-[330px]" data-name="month">
      <p className="[grid-area:1_/_1] font-['SF_Pro:Semibold',sans-serif] font-[590] leading-[normal] relative shrink-0 text-[13px] text-[rgba(0,0,0,0.2)] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        MON
      </p>
      <p className="[grid-area:1_/_2] font-['SF_Pro:Semibold',sans-serif] font-[590] leading-[normal] relative shrink-0 text-[13px] text-[rgba(0,0,0,0.2)] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        TUE
      </p>
      <p className="[grid-area:1_/_3] font-['SF_Pro:Semibold',sans-serif] font-[590] leading-[normal] relative shrink-0 text-[13px] text-[rgba(0,0,0,0.2)] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        WED
      </p>
      <p className="[grid-area:1_/_4] font-['SF_Pro:Semibold',sans-serif] font-[590] leading-[normal] relative shrink-0 text-[13px] text-[rgba(0,0,0,0.2)] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        THU
      </p>
      <p className="[grid-area:1_/_5] font-['SF_Pro:Semibold',sans-serif] font-[590] leading-[normal] relative shrink-0 text-[13px] text-[rgba(0,0,0,0.2)] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        FRI
      </p>
      <p className="[grid-area:1_/_6] font-['SF_Pro:Semibold',sans-serif] font-[590] leading-[normal] relative shrink-0 text-[13px] text-[rgba(0,0,0,0.2)] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        SAT
      </p>
      <p className="[grid-area:1_/_7] font-['SF_Pro:Semibold',sans-serif] font-[590] leading-[normal] relative shrink-0 text-[13px] text-[rgba(0,0,0,0.2)] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        SUN
      </p>
      <DatepickerDay />
      <DatepickerDay1 />
      <DatepickerDay2 />
      <DatepickerDay3 />
      <DatepickerDay4 />
      <DatepickerDay5 />
      <DatepickerDay6 />
      <DatepickerDay7 />
      <DatepickerDay8 />
      <DatepickerDay9 />
      <DatepickerDay10 />
      <DatepickerDay11 />
      <DatepickerDay12 />
      <DatepickerDay13 />
      <DatepickerDay14 />
      <DatepickerDay15 />
      <DatepickerDay16 />
      <DatepickerDay17 />
      <DatepickerDay18 />
      <DatepickerDay19 />
      <DatepickerDay20 />
      <DatepickerDay21 />
      <DatepickerDay22 />
      <DatepickerDay23 />
      <DatepickerDay24 />
      <DatepickerDay25 />
      <DatepickerDay26 />
      <DatepickerDay27 />
      <DatepickerDay28 />
      <DatepickerDay29 />
      <DatepickerDay30 />
    </div>
  );
}

function DatePicker() {
  return (
    <div className="backdrop-blur-[10px] backdrop-filter bg-[rgba(255,255,255,0.6)] relative shrink-0 w-full" data-name="Date picker">
      <div aria-hidden="true" className="absolute border-[#d9d9d9] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center pb-[16px] pt-[24px] px-[24px] relative w-full">
          <Top />
          <Month />
        </div>
      </div>
    </div>
  );
}

export default function SetDate() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="Set date">
      <Frame2 />
      <DatePicker />
    </div>
  );
}
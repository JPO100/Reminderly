import { useState } from "react";
import svgPaths from "../imports/svg-i4zjgmi9n8";
import svgPathsOverlay from "../imports/svg-cgv8cs3ljy";
import svgPathsRepeat from "../imports/svg-f3jsh6kipr";
import svgPathsLeftArrow from "../imports/svg-jv6shcj0yh";
import svgPathsRightArrow from "../imports/svg-1lnhu3gaqx";

interface Reminder {
  id: number;
  text: string;
  time: string;
  category: "Today" | "This week" | "Later" | "Sometime";
  completed: boolean;
  hasTime: boolean;
  repeats: boolean;
  timeDisplay?: string;
  isRemoving?: boolean;
  dueDate?: Date;
}

type FilterCategory = "Today" | "This week" | "Later" | "Sometime";

// Color mapping for checkbox borders based on category
const getCategoryColor = (category: FilterCategory): string => {
  switch (category) {
    case "Today":
      return "#00AFEE";
    case "This week":
      return "#FF007D";
    case "Later":
      return "#FAA429";
    case "Sometime":
      return "#939393";
  }
};

// Color mapping for text when checked
const getCategoryTextColor = (category: FilterCategory): string => {
  switch (category) {
    case "Today":
      return "#00AFEE"; // reminderly blue (cyan)
    case "This week":
      return "#FF007D"; // reminderly pink
    case "Later":
      return "#FAA429"; // reminderly orange
    case "Sometime":
      return "#939393"; // dark grey
  }
};

export default function App() {
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: 1,
      text: "Call Charlotte re dinner plans",
      time: "Today at 3:00 PM",
      category: "Today",
      completed: false,
      hasTime: true,
      repeats: false,
      timeDisplay: "Today at 3:00 PM",
      dueDate: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    },
    {
      id: 2,
      text: "Message James about CCTV",
      time: "Today at 6:00 PM",
      category: "Today",
      completed: false,
      hasTime: true,
      repeats: false,
      timeDisplay: "Today at 6:00 PM",
      dueDate: (() => {
        const d = new Date();
        d.setHours(18, 0, 0, 0);
        return d;
      })(),
    },
    {
      id: 3,
      text: "Give Missy her tablets",
      time: "Every day at 8:00 AM",
      category: "This week",
      completed: false,
      hasTime: true,
      repeats: true,
      timeDisplay: "Every day at 8:00 AM",
      dueDate: undefined,
    },
    {
      id: 4,
      text: "Pay parking fine!",
      time: "Wednesday at 5:00 PM",
      category: "This week",
      completed: false,
      hasTime: true,
      repeats: false,
      timeDisplay: "Wednesday at 5:00 PM",
      dueDate: (() => {
        const today = new Date();
        const dayOfWeek = today.getDay();
        const daysUntilWednesday = (3 - dayOfWeek + 7) % 7 || 7;
        const d = new Date(today);
        d.setDate(today.getDate() + daysUntilWednesday);
        d.setHours(17, 0, 0, 0);
        return d;
      })(),
    },
    {
      id: 5,
      text: "Book eye appointment",
      time: "Next month",
      category: "Later",
      completed: false,
      hasTime: true,
      repeats: false,
      timeDisplay: "Next month",
      dueDate: (() => {
        const d = new Date();
        d.setMonth(d.getMonth() + 1);
        return d;
      })(),
    },
    {
      id: 6,
      text: "Don't forget to collect drinks",
      time: "",
      category: "Sometime",
      completed: false,
      hasTime: false,
      repeats: false,
      timeDisplay: undefined,
      dueDate: undefined,
    },
    {
      id: 7,
      text: "Speak to Phil about the fence",
      time: "",
      category: "Sometime",
      completed: false,
      hasTime: false,
      repeats: false,
      timeDisplay: undefined,
      dueDate: undefined,
    },
  ]);

  const [activeFilter, setActiveFilter] = useState<FilterCategory | null>(null);
  const [isAddingReminder, setIsAddingReminder] = useState(false);
  const [newReminderText, setNewReminderText] = useState("");
  const [newReminderTime, setNewReminderTime] = useState("");
  const [showingTimeForReminder, setShowingTimeForReminder] = useState<number | null>(null);
  const [datePickerEnabled, setDatePickerEnabled] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [removalTimeouts, setRemovalTimeouts] = useState<{ [key: number]: ReturnType<typeof setTimeout> }>({});
  const [timePickerEnabled, setTimePickerEnabled] = useState(false);
  const [selectedHour, setSelectedHour] = useState<number>(9);
  const [selectedMinute, setSelectedMinute] = useState<number>(0);
  const [activePickerView, setActivePickerView] = useState<'date' | 'time' | null>(null);

  // Helper function to get the start of the week (Monday)
  const getStartOfWeek = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Sunday
    return new Date(d.setDate(diff));
  };

  // Helper function to get the end of the week (Sunday)
  const getEndOfWeek = (date: Date) => {
    const start = getStartOfWeek(date);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return end;
  };

  // Check if a reminder is overdue (past due date/time)
  const isReminderOverdue = (reminder: Reminder): boolean => {
    // Repeating reminders are never overdue
    if (reminder.repeats) return false;
    
    // If no due date, can't be overdue
    if (!reminder.dueDate) return false;
    
    const now = new Date();
    return reminder.dueDate < now;
  };

  // Determine category based on selected date
  const getCategoryFromDate = (date: Date): FilterCategory => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);
    
    // Check if it's today
    if (compareDate.getTime() === today.getTime()) {
      return "Today";
    }
    
    // Check if it's this week (Monday to Sunday)
    const weekStart = getStartOfWeek(today);
    const weekEnd = getEndOfWeek(today);
    weekStart.setHours(0, 0, 0, 0);
    weekEnd.setHours(23, 59, 59, 999);
    
    if (compareDate >= weekStart && compareDate <= weekEnd) {
      return "This week";
    }
    
    // If it's in the future, it's "Later"
    if (compareDate > today) {
      return "Later";
    }
    
    // Default to "Sometime"
    return "Sometime";
  };

  // Format date for display
  const formatDateDisplay = (date: Date): string => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);
    
    // Check if it's today
    if (compareDate.getTime() === today.getTime()) {
      return "Today";
    }
    
    // Check if it's tomorrow
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    if (compareDate.getTime() === tomorrow.getTime()) {
      return "Tomorrow";
    }
    
    // Check if it's this week
    const weekStart = getStartOfWeek(today);
    const weekEnd = getEndOfWeek(today);
    if (compareDate >= weekStart && compareDate <= weekEnd) {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      return days[date.getDay()];
    }
    
    // Otherwise show the full date
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}`;
  };

  // Check if a date is selected
  const isDateSelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth.getMonth() &&
      selectedDate.getFullYear() === currentMonth.getFullYear()
    );
  };

  // Check if a date is in the past
  const isDateInPast = (day: number) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const checkDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    checkDate.setHours(0, 0, 0, 0);
    
    return checkDate < today;
  };

  // Format selected date with ordinal suffix for display (e.g., "Oct 2nd")
  const formatSelectedDate = (date: Date): string => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day = date.getDate();
    
    // Add ordinal suffix
    let suffix = 'th';
    if (day === 1 || day === 21 || day === 31) suffix = 'st';
    else if (day === 2 || day === 22) suffix = 'nd';
    else if (day === 3 || day === 23) suffix = 'rd';
    
    return `${months[date.getMonth()]} ${day}${suffix}`;
  };

  // Generate calendar days for the current month
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // First day of the month
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    // Get the day of week for the first day (0 = Sunday, 1 = Monday, etc.)
    let firstDayOfWeek = firstDay.getDay();
    // Convert to Monday = 0, Sunday = 6
    firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
    
    const daysInMonth = lastDay.getDate();
    
    return {
      firstDayOfWeek,
      daysInMonth,
      year,
      month
    };
  };

  // Navigate to previous month
  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  // Handle date selection
  const handleDateSelect = (day: number) => {
    const selected = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setSelectedDate(selected);
  };

  // Sort reminders chronologically by category and then by time
  const sortReminders = (remindersToSort: Reminder[]) => {
    const categoryOrder: { [key: string]: number } = {
      "Today": 1,
      "This week": 2,
      "Later": 3,
      "Sometime": 4
    };

    return [...remindersToSort].sort((a, b) => {
      // First, sort by category
      const categoryDiff = categoryOrder[a.category] - categoryOrder[b.category];
      if (categoryDiff !== 0) return categoryDiff;

      // Within same category, sort by time if both have time
      if (a.hasTime && b.hasTime && a.timeDisplay && b.timeDisplay) {
        // Simple alphabetical sort for now (works for times like "Today at 3:00 PM" vs "Today at 6:00 PM")
        return a.timeDisplay.localeCompare(b.timeDisplay);
      }

      // If only one has time, put it first
      if (a.hasTime && !b.hasTime) return -1;
      if (!a.hasTime && b.hasTime) return 1;

      // Otherwise maintain current order
      return 0;
    });
  };

  const filteredReminders = sortReminders(
    activeFilter 
      ? reminders.filter((reminder) => reminder.category === activeFilter && !reminder.completed)
      : reminders.filter((reminder) => !reminder.completed)
  );

  const toggleReminder = (id: number) => {
    const reminder = reminders.find((r) => r.id === id);
    
    // If already in removing state, undo it
    if (reminder?.isRemoving) {
      // Clear the pending timeout
      if (removalTimeouts[id]) {
        clearTimeout(removalTimeouts[id]);
        setRemovalTimeouts((prev) => {
          const newTimeouts = { ...prev };
          delete newTimeouts[id];
          return newTimeouts;
        });
      }
      
      // Reset the reminder to default state
      setReminders(
        reminders.map((r) =>
          r.id === id
            ? { ...r, isRemoving: false }
            : r
        )
      );
      return;
    }
    
    // Otherwise, start the removal process
    setReminders(
      reminders.map((reminder) =>
        reminder.id === id
          ? { ...reminder, isRemoving: true }
          : reminder
      )
    );

    // Wait 3 seconds before marking as completed
    const timeout = setTimeout(() => {
      setReminders((currentReminders) =>
        currentReminders.map((reminder) =>
          reminder.id === id
            ? { ...reminder, completed: true, isRemoving: false }
            : reminder
        )
      );
      // Clean up the timeout reference
      setRemovalTimeouts((prev) => {
        const newTimeouts = { ...prev };
        delete newTimeouts[id];
        return newTimeouts;
      });
    }, 3000); // 3 seconds

    // Store the timeout so it can be cleared if needed
    setRemovalTimeouts((prev) => ({ ...prev, [id]: timeout }));
  };

  const showReminderTime = (id: number) => {
    if (showingTimeForReminder === id) {
      // If already showing, close it
      setShowingTimeForReminder(null);
    } else {
      // Show the time
      setShowingTimeForReminder(id);
      setTimeout(() => {
        setShowingTimeForReminder(null);
      }, 3000); // Show for 3 seconds
    }
  };

  const addNewReminder = () => {
    if (newReminderText.trim()) {
      let category: FilterCategory = "Sometime";
      let timeDisplay: string | undefined = undefined;
      let hasTime = false;

      // Determine the date to use
      let reminderDate: Date;
      
      if (selectedDate) {
        // If date is selected, use it
        reminderDate = selectedDate;
      } else if (timePickerEnabled) {
        // If only time is set (no date), default to today
        reminderDate = new Date();
      } else {
        // No date or time
        reminderDate = new Date();
      }

      // If time picker is enabled, add time to the display
      if (timePickerEnabled) {
        const hours = selectedHour;
        const minutes = selectedMinute;
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours % 12 || 12;
        const formattedTime = `${displayHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
        
        // Get date display
        const dateStr = formatDateDisplay(reminderDate);
        timeDisplay = `${dateStr} at ${formattedTime}`;
        hasTime = true;
        category = getCategoryFromDate(reminderDate);
      } else if (selectedDate) {
        // Only date, no time
        category = getCategoryFromDate(selectedDate);
        timeDisplay = formatDateDisplay(selectedDate);
        hasTime = true;
      } else {
        // No date or time - it's "Sometime"
        category = "Sometime";
        hasTime = false;
      }

      const newReminder: Reminder = {
        id: Date.now(),
        text: newReminderText,
        time: timeDisplay || "",
        category: category,
        completed: false,
        hasTime: hasTime,
        repeats: false,
        timeDisplay: timeDisplay,
        dueDate: selectedDate
      };
      
      setReminders(sortReminders([...reminders, newReminder]));
      setNewReminderText("");
      setNewReminderTime("");
      setSelectedDate(null);
      setDatePickerEnabled(false);
      setTimePickerEnabled(false);
      setSelectedHour(9);
      setSelectedMinute(0);
      setIsAddingReminder(false);
    }
  };

  const cancelAddReminder = () => {
    setIsAddingReminder(false);
    setNewReminderText("");
    setNewReminderTime("");
    setSelectedDate(null);
    setDatePickerEnabled(false);
    setTimePickerEnabled(false);
    setSelectedHour(9);
    setSelectedMinute(0);
  };

  return (
    <div className="bg-[#4784f8] content-stretch flex flex-col items-center justify-between relative size-full">
      {/* Header Logo */}
      <div className="bg-[#4784f8] content-stretch flex items-center pb-[20px] pt-[70px] px-0 relative shrink-0 w-full">
        <div className="content-stretch flex items-center justify-between relative shrink-0 w-[209.653px] mx-auto">
          <div className="relative shrink-0 size-[35.653px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 35.6533 35.6533">
              <g>
                <path d={svgPaths.p3babd700} fill="white" />
                <g>
                  <path d={svgPaths.p2e09d80} fill="white" />
                  <path d={svgPaths.p3b133a00} fill="white" />
                </g>
              </g>
            </svg>
          </div>
          <div className="content-stretch flex flex-col items-start pb-[4px] pt-0 px-0 relative shrink-0">
            <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[34px] text-nowrap text-white">
              <p className="leading-[normal]">reminderly</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Menu */}
      <div className="bg-[#4784f8] relative shrink-0 w-full">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center justify-between p-[20px] relative w-full">
            {(["Today", "This week", "Later", "Sometime"] as FilterCategory[]).map(
              (filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(activeFilter === filter ? null : filter)}
                  className={`relative content-stretch flex items-center justify-center px-[16px] h-[40px] rounded-[100px] shrink-0 ${
                    activeFilter === filter
                      ? "bg-[rgba(255,255,255,0.15)]"
                      : "bg-transparent"
                  }`}
                >
                  {activeFilter === filter && (
                    <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[100px]" />
                  )}
                  <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-nowrap text-white">
                    <p className="leading-[normal]">{filter}</p>
                  </div>
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* White Content Area */}
      <div className="basis-0 bg-white grow min-h-0 relative rounded-tl-[20px] rounded-tr-[20px] w-full overflow-hidden flex flex-col">
        <div className="flex flex-col items-center gap-[32px] px-[20px] py-[32px] h-full min-h-0">
          {/* Reminder List */}
          <div className="content-stretch flex flex-col items-start overflow-x-clip overflow-y-auto relative rounded-[10px] w-[362px] flex-1 min-h-0">
            {filteredReminders.length > 0 ? (
              filteredReminders.map((reminder) => (
                <div
                  key={reminder.id}
                  className="content-stretch flex flex-col items-start pb-[10px] pt-0 px-0 relative shrink-0 w-full"
                >
                  <div className="relative rounded-[100px] shrink-0 w-full overflow-hidden">
                    <div className="flex flex-row items-center size-full">
                      <div className="content-stretch flex items-center justify-between px-px py-[13px] relative w-full">
                        {/* Reminder Details */}
                        <div className="basis-0 grow min-h-px min-w-px relative shrink-0 flex items-center gap-[16px]">
                          {/* Checkbox */}
                          <button
                            onClick={() => toggleReminder(reminder.id)}
                            className="block cursor-pointer relative shrink-0 size-[25px]"
                          >
                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 25">
                              <circle
                                cx="12.5"
                                cy="12.5"
                                fill={reminder.isRemoving ? getCategoryColor(reminder.category) : "white"}
                                r="11.5"
                                stroke={getCategoryColor(reminder.category)}
                                strokeWidth="2"
                                className="transition-all duration-300"
                              />
                              {reminder.isRemoving && (
                                <path
                                  d="M7 12.5L10.5 16L18 8.5"
                                  stroke="white"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="animate-in fade-in zoom-in duration-200"
                                />
                              )}
                            </svg>
                          </button>
                          
                          {/* Text Container */}
                          <div className="flex-1 overflow-hidden relative flex items-center">
                            {/* Reminder Text */}
                            <div 
                              className="font-['Lato:Bold',sans-serif] text-[17px] overflow-hidden transition-all duration-300 ease-in-out"
                              style={{ 
                                color: reminder.isRemoving 
                                  ? (isReminderOverdue(reminder) ? '#DE0402' : getCategoryTextColor(reminder.category))
                                  : isReminderOverdue(reminder) 
                                    ? '#DE0402' 
                                    : '#1c2c42',
                                maxWidth: showingTimeForReminder === reminder.id && reminder.timeDisplay 
                                  ? 'calc(100% - 160px)' // Shrink to make room for date/time with 16px gap
                                  : '100%'
                              }}
                            >
                              <p className={`leading-[normal] overflow-ellipsis overflow-hidden text-nowrap ${reminder.isRemoving ? 'line-through' : ''}`}>
                                {reminder.text}
                              </p>
                            </div>
                            
                            {/* Date/Time Text - slides in from right */}
                            {reminder.timeDisplay && (
                              <div 
                                className="absolute right-0 transition-transform duration-300 ease-in-out bg-white"
                                style={{
                                  transform: showingTimeForReminder === reminder.id ? 'translateX(0)' : 'translateX(100%)',
                                }}
                              >
                                <div 
                                  className="font-['Lato:Bold',sans-serif] text-[17px] whitespace-nowrap pl-[16px]"
                                  style={{ color: isReminderOverdue(reminder) ? '#DE0402' : getCategoryTextColor(reminder.category) }}
                                >
                                  {reminder.timeDisplay}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Clock Icon */}
                        {reminder.hasTime ? (
                          <button
                            onClick={() => showReminderTime(reminder.id)}
                            className={`content-stretch cursor-pointer flex items-center justify-end p-0 relative shrink-0 ml-[16px] ${
                              reminder.isRemoving ? 'opacity-50' : ''
                            }`}
                          >
                            {reminder.repeats ? (
                              <div className="bg-white relative shrink-0 size-[25px]">
                                <div className="absolute h-[25.071px] left-0 top-0 w-[25px]">
                                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 25.0709">
                                    <g>
                                      <g>
                                        <path d={svgPathsRepeat.p2d2a0080} fill={showingTimeForReminder === reminder.id ? getCategoryColor(reminder.category) : "#BABABA"} />
                                        <path d={svgPathsRepeat.p2ca94100} fill={showingTimeForReminder === reminder.id ? getCategoryColor(reminder.category) : "#BABABA"} />
                                      </g>
                                      <path d={svgPathsRepeat.p3e0df600} stroke={showingTimeForReminder === reminder.id ? getCategoryColor(reminder.category) : "#BABABA"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                    </g>
                                  </svg>
                                </div>
                              </div>
                            ) : (
                              <div className="bg-white relative shrink-0 size-[25px]">
                                <div className="absolute aspect-[20/20] left-0 right-0 top-1/2 translate-y-[-50%]">
                                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 25">
                                    <circle cx="12.5" cy="12.5" r="11.5" stroke={isReminderOverdue(reminder) ? "#DE0402" : (showingTimeForReminder === reminder.id ? getCategoryColor(reminder.category) : "#BABABA")} strokeWidth="2" />
                                  </svg>
                                </div>
                                <div className="absolute inset-[32%_42%_38%_48%]">
                                  <div className="absolute inset-[-13.33%_-40%]">
                                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.5 9.5">
                                      <path d="M1 1V6L3.5 8.5" stroke={isReminderOverdue(reminder) ? "#DE0402" : (showingTimeForReminder === reminder.id ? getCategoryColor(reminder.category) : "#BABABA")} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            )}
                          </button>
                        ) : (
                          <div className={`bg-white relative shrink-0 size-[25px] ml-[16px] ${
                            reminder.isRemoving ? 'opacity-50' : ''
                          }`}>
                            <div className="absolute aspect-[20/20] left-0 right-0 top-1/2 translate-y-[-50%]">
                              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 25">
                                <circle cx="12.5" cy="12.5" r="11.5" stroke="#BABABA" strokeWidth="2" strokeDasharray="2 2" />
                              </svg>
                            </div>
                            <div className="absolute inset-[32%_42%_38%_48%]">
                              <div className="absolute inset-[-13.33%_-40%]">
                                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.5 9.5">
                                  <path d="M1 1V6L3.5 8.5" stroke="#BABABA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="font-['Lato',sans-serif] font-semibold text-[17px] text-[#CCCCCC]">
                  No reminders... take it easy!
                </p>
              </div>
            )}
          </div>

          {/* New Reminder Button */}
          <button
            onClick={() => setIsAddingReminder(true)}
            className="bg-[#4784f8] content-stretch flex gap-[16px] h-[60px] items-center justify-center px-[30px] py-[22px] relative rounded-[100px] shrink-0 w-[362px]"
          >
            <div className="relative shrink-0 size-[15px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
                <path d={svgPaths.p1e67ad80} fill="white" />
              </svg>
            </div>
            <div className="flex flex-col font-['Lato',sans-serif] font-bold justify-center leading-[normal] not-italic relative shrink-0 text-[20px] text-nowrap text-white">
              New reminder
            </div>
          </button>
        </div>
      </div>

      {/* New Reminder Overlay */}
      {isAddingReminder && (
        <div 
          className="fixed inset-0 z-50 flex items-end"
          onClick={cancelAddReminder}
        >
          <div 
            className="w-full animate-in slide-in-from-bottom duration-300"
            onClick={(e) => e.stopPropagation()}
            style={{ height: 'calc(100vh - 133px)' }}
          >
            <div className="bg-white content-stretch flex flex-col items-start relative rounded-tl-[20px] rounded-tr-[20px] h-full">
              {/* Header and Content */}
              <div className="relative shrink-0 w-full">
                <div className="size-full">
                  <div className="content-stretch flex flex-col gap-[30px] items-start pb-0 pt-[24px] px-[20px] relative w-full">
                    {/* Header */}
                    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
                      <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1c2c42] text-[20px] text-nowrap">
                        <p className="leading-[normal]">New reminder</p>
                      </div>
                      <button
                        onClick={addNewReminder}
                        disabled={datePickerEnabled ? (!newReminderText.trim() || !selectedDate) : !newReminderText.trim()}
                        className="block cursor-pointer relative shrink-0 size-[50px] disabled:cursor-not-allowed"
                      >
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 50 50">
                          <g>
                            <rect fill={(datePickerEnabled ? (!newReminderText.trim() || !selectedDate) : !newReminderText.trim()) ? "#D9D9D9" : "#4784F8"} height="48" rx="24" width="48" x="1" y="1" />
                            <rect height="48" rx="24" stroke={(datePickerEnabled ? (!newReminderText.trim() || !selectedDate) : !newReminderText.trim()) ? "#D9D9D9" : "#4784F8"} strokeWidth="2" width="48" x="1" y="1" />
                            <path d={svgPathsOverlay.p542f3c0} fill="#F0FAFE" />
                          </g>
                        </svg>
                      </button>
                    </div>

                    {/* Text Input */}
                    <textarea
                      value={newReminderText}
                      onChange={(e) => setNewReminderText(e.target.value)}
                      placeholder="Don't forget..."
                      className="bg-[#f7f7f7] h-[80px] rounded-[10px] shrink-0 w-full p-4 font-['Lato:Medium',sans-serif] text-[17px] text-[#1c2c42] resize-none focus:outline-none focus:ring-2 focus:ring-[#4784f8]"
                      autoFocus
                    />

                    {/* Options */}
                    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full gap-[20px]">
                      {/* Set date - with expandable calendar */}
                      <div className={`content-stretch flex flex-col items-start relative shrink-0 w-full ${datePickerEnabled && activePickerView === 'date' ? 'gap-[16px] mb-[-16px]' : ''}`}>
                        {/* Set date toggle row */}
                        <div className="content-stretch flex items-center justify-between pb-0 pt-0 px-0 relative shrink-0 w-full">
                          <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
                            <div className="relative shrink-0 size-[25px]">
                              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 25">
                                <g>
                                  <rect fill="white" height="25" width="25" />
                                  <circle cx="12.5" cy="12.5" r="11.5" stroke="#1C2C42" strokeWidth="2" />
                                  <path d="M12 8V13L14.5 15.5" stroke="#1C2C42" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                </g>
                              </svg>
                            </div>
                            <p className="font-['Lato:Bold',sans-serif] leading-[23px] not-italic relative shrink-0 text-[#1c2c42] text-[17px] text-nowrap">Set date</p>
                            {selectedDate && datePickerEnabled && (
                              <button
                                onClick={() => setActivePickerView('date')}
                                className={datePickerEnabled && timePickerEnabled ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}
                              >
                                <p className="font-['Lato:Bold',sans-serif] leading-[23px] not-italic relative shrink-0 text-[#4784f8] text-[17px] text-nowrap">
                                  {formatSelectedDate(selectedDate)}
                                </p>
                              </button>
                            )}
                          </div>
                          <button 
                            onClick={() => {
                              const newEnabled = !datePickerEnabled;
                              if (newEnabled) {
                                // Turning ON - set as active view
                                setActivePickerView('date');
                              } else {
                                // Turning OFF - clear the selected date and active view if it was date
                                setSelectedDate(null);
                                if (activePickerView === 'date') {
                                  setActivePickerView(timePickerEnabled ? 'time' : null);
                                }
                              }
                              setDatePickerEnabled(newEnabled);
                            }}
                            className="h-[30px] relative shrink-0 w-[56px]"
                          >
                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 56 30">
                              <g>
                                <rect fill={datePickerEnabled ? "#4784F8" : "#D9D9D9"} height="30" rx="15" width="56" />
                                <circle cx={datePickerEnabled ? "41" : "15"} cy="15" fill="white" r="11.25" className="transition-all duration-300" />
                              </g>
                            </svg>
                          </button>
                        </div>

                        {/* Date Picker Calendar - shows when toggle is on AND it's the active view */}
                        {datePickerEnabled && activePickerView === 'date' && (
                          <div className="backdrop-blur-[10px] backdrop-filter bg-[rgba(255,255,255,0.6)] relative shrink-0 w-full">
                            <div aria-hidden="true" className="absolute border-[#d9d9d9] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
                            <div className="flex flex-col items-center size-full">
                              <div className="content-stretch flex flex-col items-center pb-[16px] pt-[24px] px-[24px] relative w-full">
                                {/* Calendar Header */}
                                <div className="content-stretch flex items-center justify-between pb-[16px] pt-0 px-0 relative shrink-0 w-[316px]">
                                  <div className="content-stretch flex gap-[3px] items-center relative shrink-0">
                                    <p className="font-['Lato:Bold',sans-serif] leading-[normal] relative shrink-0 text-[17px] text-black text-nowrap">
                                      {currentMonth.toLocaleString('default', { month: 'long' })} {currentMonth.getFullYear()}
                                    </p>
                                  </div>
                                  <div className="content-stretch flex items-center gap-[40.9995px] relative shrink-0">
                                    <button className="relative shrink-0 h-[18.879px] w-[11.0002px]" onClick={previousMonth}>
                                      <svg className="block size-full scale-x-[-1]" fill="none" preserveAspectRatio="none" viewBox="0 0 11.0002 18.8785">
                                        <path d={svgPathsLeftArrow.p253f5200} fill="#4784F8" />
                                      </svg>
                                    </button>
                                    <button className="relative shrink-0 h-[18.879px] w-[11.0002px]" onClick={nextMonth}>
                                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.0002 18.8785">
                                        <path d={svgPathsRightArrow.p253f5200} fill="#4784F8" />
                                      </svg>
                                    </button>
                                  </div>
                                </div>

                                {/* Calendar Grid */}
                                <div className="gap-[6px] grid grid-cols-[42px_42px_42px_42px_42px_42px_42px] grid-rows-[16px_42px_42px_42px_42px_42px] pb-0 pt-[9px] px-0 relative shrink-0 w-[330px]">
                                  {/* Day headers */}
                                  <p className="[grid-area:1_/_1] font-['Lato:Bold',sans-serif] leading-[normal] relative shrink-0 text-[13px] text-[rgba(0,0,0,0.2)] text-center text-nowrap">MON</p>
                                  <p className="[grid-area:1_/_2] font-['Lato:Bold',sans-serif] leading-[normal] relative shrink-0 text-[13px] text-[rgba(0,0,0,0.2)] text-center text-nowrap">TUE</p>
                                  <p className="[grid-area:1_/_3] font-['Lato:Bold',sans-serif] leading-[normal] relative shrink-0 text-[13px] text-[rgba(0,0,0,0.2)] text-center text-nowrap">WED</p>
                                  <p className="[grid-area:1_/_4] font-['Lato:Bold',sans-serif] leading-[normal] relative shrink-0 text-[13px] text-[rgba(0,0,0,0.2)] text-center text-nowrap">THU</p>
                                  <p className="[grid-area:1_/_5] font-['Lato:Bold',sans-serif] leading-[normal] relative shrink-0 text-[13px] text-[rgba(0,0,0,0.2)] text-center text-nowrap">FRI</p>
                                  <p className="[grid-area:1_/_6] font-['Lato:Bold',sans-serif] leading-[normal] relative shrink-0 text-[13px] text-[rgba(0,0,0,0.2)] text-center text-nowrap">SAT</p>
                                  <p className="[grid-area:1_/_7] font-['Lato:Bold',sans-serif] leading-[normal] relative shrink-0 text-[13px] text-[rgba(0,0,0,0.2)] text-center text-nowrap">SUN</p>
                                  
                                  {/* Generate calendar days dynamically */}
                                  {(() => {
                                    const { firstDayOfWeek, daysInMonth } = generateCalendarDays();
                                    const days = [];
                                    
                                    // Calculate total cells needed
                                    for (let day = 1; day <= daysInMonth; day++) {
                                      const cellIndex = firstDayOfWeek + day - 1;
                                      const row = Math.floor(cellIndex / 7) + 2; // +2 because row 1 is headers
                                      const col = (cellIndex % 7) + 1;
                                      const selected = isDateSelected(day);
                                      const isPast = isDateInPast(day);
                                      
                                      days.push(
                                        <button
                                          key={day}
                                          onClick={() => !isPast && handleDateSelect(day)}
                                          disabled={isPast}
                                          className={`[grid-area:${row}_/_${col}] content-stretch flex flex-col h-[42px] items-center justify-center justify-self-stretch relative rounded-[99px] shrink-0 transition-colors ${
                                            isPast 
                                              ? 'cursor-not-allowed' 
                                              : `cursor-pointer ${selected ? 'bg-[#08f]' : 'hover:bg-[rgba(71,132,248,0.1)]'}`
                                          }`}
                                        >
                                          <p className={`leading-[normal] relative shrink-0 text-[20px] text-center w-full ${
                                            isPast 
                                              ? 'font-[\'Lato\',sans-serif] font-medium text-[#BABABA]' 
                                              : `font-['Lato:Bold',sans-serif] ${selected ? 'text-white' : 'text-black'}`
                                          }`}>
                                            {day}
                                          </p>
                                        </button>
                                      );
                                    }
                                    
                                    return days;
                                  })()}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Set time */}
                      <div className={`content-stretch flex flex-col items-start relative shrink-0 w-full ${timePickerEnabled && activePickerView === 'time' ? 'gap-[16px] mb-[-16px]' : ''}`}>
                        {/* Set time toggle row */}
                        <div className="content-stretch flex items-center justify-between pb-0 pt-0 px-0 relative shrink-0 w-full">
                          <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-[194.875px]">
                            <div className="relative shrink-0 size-[25px]">
                              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 25">
                                <g>
                                  <rect fill="white" height="25" width="25" />
                                  <circle cx="12.5" cy="12.5" r="11.5" stroke="#1C2C42" strokeWidth="2" />
                                  <path d="M12 8V13L14.5 15.5" stroke="#1C2C42" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                </g>
                              </svg>
                            </div>
                            <p className="font-['Lato:Bold',sans-serif] leading-[23px] not-italic relative shrink-0 text-[#1c2c42] text-[17px] text-nowrap">Set time</p>
                            {timePickerEnabled && (
                              <button
                                onClick={() => setActivePickerView('time')}
                                className={datePickerEnabled && timePickerEnabled ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}
                              >
                                <p className="font-['Lato:Bold',sans-serif] leading-[23px] not-italic relative shrink-0 text-[#4784f8] text-[17px] text-nowrap">
                                  {(() => {
                                    const hours = selectedHour;
                                    const minutes = selectedMinute;
                                    const ampm = hours >= 12 ? 'PM' : 'AM';
                                    const displayHours = hours % 12 || 12;
                                    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
                                  })()}
                                </p>
                              </button>
                            )}
                          </div>
                          <button
                            onClick={() => {
                              const newEnabled = !timePickerEnabled;
                              if (newEnabled) {
                                // Turning ON - set as active view
                                setActivePickerView('time');
                                // If date toggle is ON but no date is selected, turn it off
                                if (datePickerEnabled && !selectedDate) {
                                  setDatePickerEnabled(false);
                                }
                              } else {
                                // Turning OFF - clear the active view if it was time
                                if (activePickerView === 'time') {
                                  setActivePickerView(datePickerEnabled ? 'date' : null);
                                }
                              }
                              setTimePickerEnabled(newEnabled);
                            }}
                            className="h-[30px] relative shrink-0 w-[56px]"
                          >
                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 56 30">
                              <g>
                                <rect fill={timePickerEnabled ? "#4784F8" : "#D9D9D9"} height="30" rx="15" width="56" />
                                <circle cx={timePickerEnabled ? "41" : "15"} cy="15" fill="white" r="11.25" className="transition-all duration-300" />
                              </g>
                            </svg>
                          </button>
                        </div>

                        {/* Time Picker - shows when toggle is on AND it's the active view */}
                        {timePickerEnabled && activePickerView === 'time' && (
                          <div className="backdrop-blur-[10px] backdrop-filter bg-[rgba(255,255,255,0.6)] h-[238px] relative shrink-0 w-full">
                            <div aria-hidden="true" className="absolute border-[#d9d9d9] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
                            <div className="flex items-center justify-center h-full gap-[20px] px-[24px]">
                              {/* Hour picker */}
                              <div className="flex flex-col items-center gap-[8px]">
                                <p className="font-['Lato:Bold',sans-serif] text-[13px] text-[rgba(0,0,0,0.4)]">Hour</p>
                                <select
                                  value={selectedHour}
                                  onChange={(e) => setSelectedHour(Number(e.target.value))}
                                  className="bg-[rgba(0,0,0,0.04)] border-none font-['Lato:Bold',sans-serif] h-[50px] outline-none px-[16px] rounded-[17px] text-[23px] text-[rgba(0,0,0,0.8)] w-[80px] text-center cursor-pointer"
                                >
                                  {Array.from({ length: 24 }, (_, i) => (
                                    <option key={i} value={i}>
                                      {i.toString().padStart(2, '0')}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              <p className="font-['Lato:Bold',sans-serif] text-[23px] text-[rgba(0,0,0,0.8)] pt-[20px]">:</p>

                              {/* Minute picker */}
                              <div className="flex flex-col items-center gap-[8px]">
                                <p className="font-['Lato:Bold',sans-serif] text-[13px] text-[rgba(0,0,0,0.4)]">Minute</p>
                                <select
                                  value={selectedMinute}
                                  onChange={(e) => setSelectedMinute(Number(e.target.value))}
                                  className="bg-[rgba(0,0,0,0.04)] border-none font-['Lato:Bold',sans-serif] h-[50px] outline-none px-[16px] rounded-[17px] text-[23px] text-[rgba(0,0,0,0.8)] w-[80px] text-center cursor-pointer"
                                >
                                  {Array.from({ length: 60 }, (_, i) => (
                                    <option key={i} value={i}>
                                      {i.toString().padStart(2, '0')}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Repeats */}
                      <div className="content-stretch flex items-center justify-between pb-0 pt-0 px-0 relative shrink-0 w-full">
                        <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-[194.875px]">
                          <div className="bg-white h-[25.071px] relative shrink-0 w-[25px]">
                            <div className="absolute h-[25.071px] left-0 top-0 w-[25px]">
                              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 25.0709">
                                <g>
                                  <g>
                                    <path d={svgPathsOverlay.p2d2a0080} fill="#1C2C42" />
                                    <path d={svgPathsOverlay.p2ca94100} fill="#1C2C42" />
                                  </g>
                                  <path d="M12.5 8V13L15 15.5" stroke="#1C2C42" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                </g>
                              </svg>
                            </div>
                          </div>
                          <p className="font-['Lato:Bold',sans-serif] leading-[23px] not-italic relative shrink-0 text-[#1c2c42] text-[17px] text-nowrap">Repeats</p>
                        </div>
                        <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
                          <p className="font-['Lato:Bold',sans-serif] leading-[23px] not-italic relative shrink-0 text-[#1c2c42] text-[17px] text-nowrap">Never</p>
                          <div className="h-[12.733px] relative shrink-0 w-[8px]">
                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 12.7335">
                              <path d="M1.5 1L6.5 6.36675L1.5 11.7335" stroke="#1C2C42" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
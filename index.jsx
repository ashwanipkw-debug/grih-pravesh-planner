import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Download, CheckCircle2, Circle, ChevronDown, X, TrendingDown, ChevronUp } from 'lucide-react';

export default function GrihPraveshPlanner() {
  const [tab, setTab] = useState('guests');
  const [guests, setGuests] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [budget, setBudget] = useState([]);
  const [editingGuest, setEditingGuest] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [editingTimeline, setEditingTimeline] = useState(null);
  const [editingBudget, setEditingBudget] = useState(null);
  const [showGuestForm, setShowGuestForm] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showTimelineForm, setShowTimelineForm] = useState(false);
  const [showBudgetForm, setShowBudgetForm] = useState(false);
  const [showSpentForm, setShowSpentForm] = useState(null);
  const [expandedDay, setExpandedDay] = useState(null);
  const [expandedBudget, setExpandedBudget] = useState(null);
  const [editingSpent, setEditingSpent] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('praveshPlanner');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setGuests(data.guests || []);
        setTasks(data.tasks || []);
        setTimeline(data.timeline || []);
        // Ensure spent is always an array in budget items
        const fixedBudget = (data.budget || []).map(b => ({
          ...b,
          spent: Array.isArray(b.spent) ? b.spent : []
        }));
        setBudget(fixedBudget);
      } catch (e) {
        initializeDefaults();
      }
    } else {
      initializeDefaults();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('praveshPlanner', JSON.stringify({ guests, tasks, timeline, budget }));
  }, [guests, tasks, timeline, budget]);

  const initializeDefaults = () => {
    setGuests([
      { id: 1, name: 'Mr. Sharma', family: 'Sharma family', from: 'Delhi', arrival: '2026-06-18', departure: '2026-06-21', noOfPeople: 1, gift: 'Kurta set', giftStatus: 'Pending', notes: 'Flight pick-up needed' },
      { id: 2, name: 'Mrs. Sharma', family: 'Sharma family', from: 'Delhi', arrival: '2026-06-18', departure: '2026-06-21', noOfPeople: 1, gift: 'Silk saree', giftStatus: 'Pending', notes: '' },
      { id: 3, name: 'Aunt Meena', family: 'Meena family', from: 'Jaipur', arrival: '2026-06-19', departure: '2026-06-23', noOfPeople: 1, gift: 'Gold bangles', giftStatus: 'Procured', notes: 'Staying at home' },
    ]);
    setTasks([
      { id: 1, task: 'Deep clean entire house', category: 'Home Prep', done: false },
      { id: 2, task: 'Consult priest for muhurat', category: 'Rituals', done: false },
      { id: 3, task: 'Arrange Ganesh & Lakshmi idols', category: 'Rituals', done: false },
    ]);
    setTimeline([
      { id: 1, task: 'Book priest / pandit', category: 'Booking', doBy: '2026-06-12', status: 'To do' },
      { id: 2, task: 'Book caterer', category: 'Booking', doBy: '2026-06-12', status: 'To do' },
      { id: 3, task: 'Buy dry groceries', category: 'Cooking', doBy: '2026-06-16', status: 'To do' },
    ]);
    setBudget([
      { id: 1, category: 'Gifts', budgeted: 5000, spent: [], status: 'In progress' },
      { id: 2, category: 'Puja', budgeted: 8000, spent: [], status: 'Pending' },
      { id: 3, category: 'Clothes', budgeted: 15000, spent: [], status: 'Pending' },
      { id: 4, category: 'Grocery', budgeted: 12000, spent: [{ id: 1, desc: 'Vegetables', amount: 1500, date: '2026-06-10' }, { id: 2, desc: 'Spices', amount: 1500, date: '2026-06-11' }], status: 'In progress' },
      { id: 5, category: 'Catering', budgeted: 20000, spent: [], status: 'Pending' },
      { id: 6, category: 'Travel', budgeted: 5000, spent: [{ id: 1, desc: 'Guest cab', amount: 1000, date: '2026-06-08' }], status: 'In progress' },
      { id: 7, category: 'Decoration', budgeted: 8000, spent: [], status: 'Pending' },
    ]);
  };

  const addGuest = (formData) => {
    setGuests([...guests, { ...formData, id: Date.now() }]);
    setShowGuestForm(false);
  };

  const updateGuest = (id, formData) => {
    setGuests(guests.map(g => g.id === id ? { ...formData, id } : g));
    setEditingGuest(null);
  };

  const deleteGuest = (id) => {
    setGuests(guests.filter(g => g.id !== id));
  };

  const addTask = (formData) => {
    setTasks([...tasks, { ...formData, id: Date.now() }]);
    setShowTaskForm(false);
  };

  const updateTask = (id, formData) => {
    setTasks(tasks.map(t => t.id === id ? { ...formData, id } : t));
    setEditingTask(null);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const addTimeline = (formData) => {
    setTimeline([...timeline, { ...formData, id: Date.now() }]);
    setShowTimelineForm(false);
  };

  const updateTimeline = (id, formData) => {
    setTimeline(timeline.map(t => t.id === id ? { ...formData, id } : t));
    setEditingTimeline(null);
  };

  const deleteTimeline = (id) => {
    setTimeline(timeline.filter(t => t.id !== id));
  };

  const addBudget = (formData) => {
    setBudget([...budget, { ...formData, spent: [], id: Date.now() }]);
    setShowBudgetForm(false);
  };

  const updateBudget = (id, formData) => {
    setBudget(budget.map(b => b.id === id ? { ...b, ...formData, id } : b));
    setEditingBudget(null);
  };

  const deleteBudget = (id) => {
    setBudget(budget.filter(b => b.id !== id));
  };

  const addSpentEntry = (budgetId, entry) => {
    setBudget(budget.map(b => 
      b.id === budgetId 
        ? { ...b, spent: [...b.spent, { ...entry, id: Date.now() }] }
        : b
    ));
    setShowSpentForm(null);
  };

  const updateSpentEntry = (budgetId, entryId, updatedEntry) => {
    setBudget(budget.map(b =>
      b.id === budgetId
        ? { ...b, spent: b.spent.map(s => s.id === entryId ? { ...updatedEntry, id: entryId } : s) }
        : b
    ));
    setEditingSpent(null);
  };

  const deleteSpentEntry = (budgetId, entryId) => {
    setBudget(budget.map(b =>
      b.id === budgetId
        ? { ...b, spent: b.spent.filter(s => s.id !== entryId) }
        : b
    ));
  };

  const exportToCSV = () => {
    const sheets = {
      'Guest Tracker': [
        ['#', 'Person Name', 'Family / Group', 'Coming From', 'Arrival Date', 'Departure Date', 'No. of People', 'Gift Planned', 'Gift Status', 'Notes'],
        ...guests.map((g, i) => [i + 1, g.name, g.family, g.from, g.arrival, g.departure, g.noOfPeople, g.gift, g.giftStatus, g.notes])
      ],
      'Cook & Book Timeline': [
        ['Task', 'Category', 'Do By (Date)', 'Status'],
        ...timeline.map(t => [t.task, t.category, t.doBy, t.status])
      ],
      'Budget Tracker': [
        ['Category', 'Budgeted', 'Total Spent', 'Balance', 'Status'],
        ...budget.map(b => {
          const totalSpent = b.spent.reduce((sum, s) => sum + s.amount, 0);
          return [b.category, b.budgeted, totalSpent, b.budgeted - totalSpent, b.status];
        })
      ],
      'Budget Details': [
        ['Category', 'Description', 'Amount', 'Date'],
        ...budget.flatMap(b => b.spent.map(s => [b.category, s.desc, s.amount, s.date]))
      ],
      'Grih Pravesh To-Do': [
        ['Done', 'Task', 'Category'],
        ...tasks.map(t => [t.done ? '✓' : '☐', t.task, t.category])
      ]
    };

    let csvContent = '';
    for (const [sheetName, rows] of Object.entries(sheets)) {
      csvContent += `${sheetName}\n`;
      csvContent += rows.map(row => row.map(cell => `"${String(cell || '').replace(/"/g, '""')}"`).join(',')).join('\n');
      csvContent += '\n\n';
    }

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', '25june_Grih_Pravesh_Planner.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      <div className="sticky top-0 z-40 bg-gradient-to-r from-amber-900 via-orange-900 to-rose-900 text-white shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-5">
          <h1 className="text-2xl sm:text-3xl font-serif font-bold">🪔 Grih Pravesh Planner - 25 June</h1>
          <p className="text-amber-100 text-xs sm:text-sm mt-1">June 18–30, 2026</p>
        </div>
      </div>

      <div className="sticky top-20 z-30 bg-white border-b-2 border-amber-200 shadow-sm overflow-x-auto">
        <div className="max-w-4xl mx-auto flex">
          {[
            { id: 'guests', label: '👥 Guests' },
            { id: 'schedule', label: '📅 Schedule' },
            { id: 'timeline', label: '⏰ Timeline' },
            { id: 'budget', label: '💰 Budget' },
            { id: 'todo', label: '✅ To-Do' },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 min-w-max px-3 sm:px-4 py-3 font-medium text-xs sm:text-sm whitespace-nowrap transition-all ${
                tab === t.id ? 'border-b-4 border-amber-700 text-amber-900 bg-amber-50' : 'text-gray-600 hover:text-amber-700'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 pb-24">
        {/* GUESTS TAB */}
        {tab === 'guests' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <button onClick={() => setShowGuestForm(true)} className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white px-4 py-2 rounded-lg font-medium text-sm">
                <Plus size={18} /> Add Person
              </button>
              <button onClick={exportToCSV} className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-medium text-sm">
                <Download size={18} /> Export CSV
              </button>
            </div>

            {showGuestForm && <GuestForm onSubmit={addGuest} onClose={() => setShowGuestForm(false)} />}
            {editingGuest && <GuestForm guest={editingGuest} onSubmit={(f) => updateGuest(editingGuest.id, f)} onClose={() => setEditingGuest(null)} />}

            <div className="space-y-3">
              {guests.map(guest => (
                <div key={guest.id} className="bg-white rounded-lg p-3 sm:p-4 shadow-sm border-l-4 border-amber-500">
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-base text-gray-800">{guest.name}</h3>
                      <p className="text-xs text-amber-700 font-medium">{guest.family}</p>
                      <p className="text-xs text-gray-600 mt-1"><strong>From:</strong> {guest.from} | <strong>People:</strong> {guest.noOfPeople}</p>
                      <p className="text-xs text-gray-600"><strong>Dates:</strong> {guest.arrival} to {guest.departure}</p>
                      <p className="text-xs text-gray-700 mt-1"><strong>🎁 Gift:</strong> {guest.gift}</p>
                      <p className={`text-xs mt-1 font-medium ${guest.giftStatus === 'Procured' ? 'text-green-600' : 'text-orange-600'}`}>Status: {guest.giftStatus}</p>
                      {guest.notes && <p className="text-xs text-gray-600 mt-1 italic">{guest.notes}</p>}
                    </div>
                    <div className="flex gap-1">
                      <button onClick={() => setEditingGuest(guest)} className="text-blue-600 p-2 rounded hover:bg-blue-50"><Edit2 size={16} /></button>
                      <button onClick={() => deleteGuest(guest.id)} className="text-red-600 p-2 rounded hover:bg-red-50"><Trash2 size={16} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SCHEDULE TAB */}
        {tab === 'schedule' && (
          <div className="space-y-3">
            <p className="text-xs text-gray-600 mb-4">📍 Tap dates to see arrivals, departures & guest count</p>
            {[...Array(13)].map((_, i) => {
              const date = new Date(2026, 5, 18 + i);
              const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
              const dayGuests = guests.filter(g => g.arrival <= dateStr && g.departure >= dateStr);
              const arriving = guests.filter(g => g.arrival === dateStr);
              const leaving = guests.filter(g => g.departure === dateStr);
              const totalPeople = dayGuests.reduce((sum, g) => sum + parseInt(g.noOfPeople || 1), 0);
              const isCeremonyDay = dateStr === '2026-06-25';

              return (
                <div key={i} className={`rounded-lg p-3 shadow-sm transition-all ${isCeremonyDay ? 'bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-orange-400' : 'bg-white'}`}>
                  <button onClick={() => setExpandedDay(expandedDay === i ? null : i)} className="w-full text-left flex items-center justify-between">
                    <div>
                      <h3 className={`font-bold text-sm ${isCeremonyDay ? 'text-orange-900' : 'text-gray-800'}`}>
                        {date.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })}
                        {isCeremonyDay && ' 🪔'}
                      </h3>
                      <p className={`text-xs font-bold mt-1 ${totalPeople > 0 ? 'text-green-700' : 'text-gray-500'}`}>👥 {totalPeople} person{totalPeople !== 1 ? 's' : ''}</p>
                    </div>
                    <ChevronDown size={18} className={`text-gray-600 transition-transform ${expandedDay === i ? 'rotate-180' : ''}`} />
                  </button>

                  {expandedDay === i && (
                    <div className="mt-3 space-y-2 text-xs">
                      {arriving.length > 0 && <div className="text-green-700 font-medium">✈️ Arriving: {arriving.map(g => `${g.name} (+${g.noOfPeople})`).join(', ')}</div>}
                      {leaving.length > 0 && <div className="text-red-700 font-medium">🚗 Departing: {leaving.map(g => g.name).join(', ')}</div>}
                      <div className="text-gray-700 font-medium">👥 Total present: {dayGuests.length > 0 ? dayGuests.map(g => `${g.name} (${g.noOfPeople})`).join(', ') : 'None'}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* TIMELINE TAB */}
        {tab === 'timeline' && (
          <div className="space-y-4">
            <button onClick={() => setShowTimelineForm(true)} className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 rounded-lg font-medium text-sm w-full">
              <Plus size={18} /> Add Task
            </button>

            {showTimelineForm && <TimelineForm onSubmit={addTimeline} onClose={() => setShowTimelineForm(false)} />}
            {editingTimeline && <TimelineForm task={editingTimeline} onSubmit={(f) => updateTimeline(editingTimeline.id, f)} onClose={() => setEditingTimeline(null)} />}

            <div className="space-y-2">
              {timeline.sort((a, b) => new Date(a.doBy) - new Date(b.doBy)).map(task => (
                <div key={task.id} className={`rounded-lg p-3 shadow-sm border-l-4 ${task.category === 'Booking' ? 'bg-blue-50 border-blue-400' : 'bg-orange-50 border-orange-400'}`}>
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-sm text-gray-800">{task.task}</h3>
                      <p className="text-xs text-gray-600 mt-1">
                        📅 {task.doBy} •
                        <span className={`ml-2 px-2 py-0.5 rounded text-xs font-medium ${task.category === 'Booking' ? 'bg-blue-200 text-blue-800' : 'bg-orange-200 text-orange-800'}`}>{task.category}</span>
                        <span className={`ml-2 px-2 py-0.5 rounded text-xs font-medium ${task.status === 'Done' ? 'bg-green-200 text-green-800' : task.status === 'In progress' ? 'bg-yellow-200 text-yellow-800' : 'bg-gray-200 text-gray-800'}`}>{task.status}</span>
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <button onClick={() => setEditingTimeline(task)} className="text-blue-600 p-1.5 rounded hover:bg-blue-100"><Edit2 size={16} /></button>
                      <button onClick={() => deleteTimeline(task.id)} className="text-red-600 p-1.5 rounded hover:bg-red-100"><Trash2 size={16} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BUDGET TAB */}
        {tab === 'budget' && (
          <div className="space-y-4">
            <button onClick={() => setShowBudgetForm(true)} className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-lg font-medium text-sm w-full">
              <Plus size={18} /> Add Budget Category
            </button>

            {showBudgetForm && <BudgetForm onSubmit={addBudget} onClose={() => setShowBudgetForm(false)} />}
            {editingBudget && <BudgetForm item={editingBudget} onSubmit={(f) => updateBudget(editingBudget.id, f)} onClose={() => setEditingBudget(null)} />}

            <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-green-500 mb-4">
              <h3 className="font-bold text-gray-800 mb-2">Total Budget Summary</h3>
              <div className="space-y-1 text-xs">
                <p><strong>Total Budgeted:</strong> ₹{budget.reduce((sum, b) => sum + b.budgeted, 0).toLocaleString('en-IN')}</p>
                <p><strong>Total Spent:</strong> ₹{budget.reduce((sum, b) => sum + b.spent.reduce((s, e) => s + e.amount, 0), 0).toLocaleString('en-IN')}</p>
                <p className={`font-bold ${budget.reduce((sum, b) => sum + (b.budgeted - b.spent.reduce((s, e) => s + e.amount, 0)), 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  <strong>Balance:</strong> ₹{budget.reduce((sum, b) => sum + (b.budgeted - b.spent.reduce((s, e) => s + e.amount, 0)), 0).toLocaleString('en-IN')}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {budget.map(item => {
                const totalSpent = item.spent.reduce((sum, s) => sum + s.amount, 0);
                const balance = item.budgeted - totalSpent;
                return (
                  <div key={item.id} className="bg-white rounded-lg shadow-sm border-l-4 border-green-400 overflow-hidden">
                    <button onClick={() => setExpandedBudget(expandedBudget === item.id ? null : item.id)} className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50">
                      <div className="flex-1">
                        <h3 className="font-bold text-sm text-gray-800">{item.category}</h3>
                        <p className="text-xs text-gray-600 mt-1">Budget: ₹{item.budgeted.toLocaleString('en-IN')} | Spent: ₹{totalSpent.toLocaleString('en-IN')}</p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div className={`h-2 rounded-full transition-all ${totalSpent > item.budgeted ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${Math.min(100, (totalSpent / item.budgeted) * 100)}%` }}></div>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-2 flex-shrink-0">
                        <button onClick={(e) => { e.stopPropagation(); setEditingBudget(item); }} className="text-blue-600 p-1.5 rounded hover:bg-blue-100"><Edit2 size={16} /></button>
                        <ChevronDown size={18} className={`text-gray-600 transition-transform ${expandedBudget === item.id ? 'rotate-180' : ''}`} />
                      </div>
                    </button>

                    {expandedBudget === item.id && (
                      <div className="border-t border-gray-200 p-4 space-y-3">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className={`text-xs font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>Balance: ₹{balance.toLocaleString('en-IN')}</p>
                        </div>

                        <div>
                          <h4 className="text-xs font-bold text-gray-700 mb-2">Spending Entries:</h4>
                          <div className="space-y-2">
                            {item.spent.map(entry => (
                              <div key={entry.id} className="bg-orange-50 p-2 rounded-lg flex justify-between items-start gap-2">
                                <div className="flex-1 text-xs">
                                  <p className="font-medium text-gray-800">{entry.desc}</p>
                                  <p className="text-gray-600">₹{entry.amount.toLocaleString('en-IN')} • {entry.date}</p>
                                </div>
                                <div className="flex gap-1">
                                  <button onClick={() => setEditingSpent({ budgetId: item.id, entryId: entry.id, entry })} className="text-blue-600 p-1 rounded hover:bg-blue-100"><Edit2 size={14} /></button>
                                  <button onClick={() => deleteSpentEntry(item.id, entry.id)} className="text-red-600 p-1 rounded hover:bg-red-100"><Trash2 size={14} /></button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <button onClick={() => setShowSpentForm(item.id)} className="w-full bg-orange-500 text-white py-2 rounded-lg font-medium text-xs flex items-center justify-center gap-1">
                          <Plus size={14} /> Add Spending Entry
                        </button>

                        {showSpentForm === item.id && <SpentForm budgetId={item.id} onSubmit={(entry) => addSpentEntry(item.id, entry)} onClose={() => setShowSpentForm(null)} />}
                        {editingSpent && editingSpent.budgetId === item.id && <SpentForm budgetId={item.id} entry={editingSpent.entry} onSubmit={(entry) => updateSpentEntry(item.id, editingSpent.entryId, entry)} onClose={() => setEditingSpent(null)} />}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TO-DO TAB */}
        {tab === 'todo' && (
          <div className="space-y-4">
            <button onClick={() => setShowTaskForm(true)} className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-medium text-sm w-full">
              <Plus size={18} /> Add Task
            </button>

            {showTaskForm && <TaskForm onSubmit={addTask} onClose={() => setShowTaskForm(false)} />}
            {editingTask && <TaskForm task={editingTask} onSubmit={(f) => updateTask(editingTask.id, f)} onClose={() => setEditingTask(null)} />}

            {['Rituals', 'Home Prep', 'Guests', 'Food', 'Booking', 'Extras'].map(category => {
              const catTasks = tasks.filter(t => t.category === category);
              if (catTasks.length === 0) return null;
              return (
                <div key={category} className="mb-4">
                  <h3 className="font-bold text-gray-700 mb-2 text-xs uppercase tracking-wide">{category}</h3>
                  <div className="space-y-2">
                    {catTasks.map(task => (
                      <div key={task.id} className="bg-white rounded-lg p-3 shadow-sm flex items-start gap-2">
                        <button onClick={() => toggleTask(task.id)} className="text-gray-400 hover:text-amber-600 mt-0.5">
                          {task.done ? <CheckCircle2 size={18} className="text-green-600" /> : <Circle size={18} />}
                        </button>
                        <p className={`text-xs flex-1 ${task.done ? 'line-through text-gray-400' : 'text-gray-800'}`}>{task.task}</p>
                        <div className="flex gap-1">
                          <button onClick={() => setEditingTask(task)} className="text-blue-600 p-1 rounded hover:bg-blue-50"><Edit2 size={14} /></button>
                          <button onClick={() => deleteTask(task.id)} className="text-red-600 p-1 rounded hover:bg-red-50"><Trash2 size={14} /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function GuestForm({ guest, onSubmit, onClose }) {
  const [form, setForm] = useState(guest || { name: '', family: '', from: '', arrival: '', departure: '', noOfPeople: '1', gift: '', giftStatus: 'Pending', notes: '' });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end z-50">
      <div className="bg-white w-full rounded-t-2xl p-4 max-h-96 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">{guest ? 'Edit Person' : 'Add Person'}</h2>
          <button onClick={onClose}><X size={20} /></button>
        </div>
        <div className="space-y-2">
          <input type="text" placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg" />
          <input type="text" placeholder="Family / Group" value={form.family} onChange={(e) => setForm({ ...form, family: e.target.value })} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg" />
          <input type="text" placeholder="Coming From (city)" value={form.from} onChange={(e) => setForm({ ...form, from: e.target.value })} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg" />
          <div className="flex gap-2">
            <input type="date" value={form.arrival} onChange={(e) => setForm({ ...form, arrival: e.target.value })} className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg" />
            <input type="date" value={form.departure} onChange={(e) => setForm({ ...form, departure: e.target.value })} className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg" />
          </div>
          <input type="number" placeholder="No. of People" value={form.noOfPeople} onChange={(e) => setForm({ ...form, noOfPeople: e.target.value })} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg" />
          <input type="text" placeholder="Gift Planned" value={form.gift} onChange={(e) => setForm({ ...form, gift: e.target.value })} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg" />
          <select value={form.giftStatus} onChange={(e) => setForm({ ...form, giftStatus: e.target.value })} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg">
            <option value="Pending">🔴 Pending</option>
            <option value="In progress">🟡 In progress</option>
            <option value="Procured">🟢 Procured</option>
          </select>
          <textarea placeholder="Notes (optional)" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg" rows="2" />
          <div className="flex gap-2 mt-4">
            <button onClick={() => onSubmit(form)} className="flex-1 bg-green-600 text-white py-2 rounded-lg font-medium text-sm">Save</button>
            <button onClick={onClose} className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg font-medium text-sm">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TaskForm({ task, onSubmit, onClose }) {
  const [form, setForm] = useState(task || { task: '', category: 'Rituals', done: false });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end z-50">
      <div className="bg-white w-full rounded-t-2xl p-4 max-h-96 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">{task ? 'Edit Task' : 'Add Task'}</h2>
          <button onClick={onClose}><X size={20} /></button>
        </div>
        <div className="space-y-2">
          <input type="text" placeholder="Task" value={form.task} onChange={(e) => setForm({ ...form, task: e.target.value })} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg" />
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg">
            {['Rituals', 'Home Prep', 'Guests', 'Food', 'Booking', 'Extras'].map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <div className="flex gap-2 mt-4">
            <button onClick={() => onSubmit(form)} className="flex-1 bg-green-600 text-white py-2 rounded-lg font-medium text-sm">Save</button>
            <button onClick={onClose} className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg font-medium text-sm">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TimelineForm({ task, onSubmit, onClose }) {
  const [form, setForm] = useState(task || { task: '', category: 'Booking', doBy: '', status: 'To do' });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end z-50">
      <div className="bg-white w-full rounded-t-2xl p-4 max-h-96 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">{task ? 'Edit Task' : 'Add Task'}</h2>
          <button onClick={onClose}><X size={20} /></button>
        </div>
        <div className="space-y-2">
          <input type="text" placeholder="Task" value={form.task} onChange={(e) => setForm({ ...form, task: e.target.value })} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg" />
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg">
            {['Booking', 'Cooking'].map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <input type="date" value={form.doBy} onChange={(e) => setForm({ ...form, doBy: e.target.value })} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg" />
          <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg">
            {['To do', 'In progress', 'Done'].map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <div className="flex gap-2 mt-4">
            <button onClick={() => onSubmit(form)} className="flex-1 bg-green-600 text-white py-2 rounded-lg font-medium text-sm">Save</button>
            <button onClick={onClose} className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg font-medium text-sm">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function BudgetForm({ item, onSubmit, onClose }) {
  const [form, setForm] = useState(item || { category: 'Gifts', budgeted: '', status: 'Pending' });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end z-50">
      <div className="bg-white w-full rounded-t-2xl p-4 max-h-96 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">{item ? 'Edit Budget' : 'Add Budget Category'}</h2>
          <button onClick={onClose}><X size={20} /></button>
        </div>
        <div className="space-y-2">
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg">
            {['Gifts', 'Puja', 'Clothes', 'Grocery', 'Catering', 'Travel', 'Decoration', 'Other'].map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <input type="number" placeholder="Budgeted ₹" value={form.budgeted} onChange={(e) => setForm({ ...form, budgeted: parseInt(e.target.value) || 0 })} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg" />
          <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg">
            {['Pending', 'In progress', 'Done'].map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <div className="flex gap-2 mt-4">
            <button onClick={() => onSubmit(form)} className="flex-1 bg-green-600 text-white py-2 rounded-lg font-medium text-sm">Save</button>
            <button onClick={onClose} className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg font-medium text-sm">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SpentForm({ budgetId, entry, onSubmit, onClose }) {
  const [form, setForm] = useState(entry ? { desc: entry.desc, amount: entry.amount, date: entry.date } : { desc: '', amount: 0, date: new Date().toISOString().split('T')[0] });

  const handleSubmit = () => {
    if (form.desc && form.amount > 0) {
      onSubmit({ desc: form.desc, amount: parseInt(form.amount) || 0, date: form.date });
    } else {
      alert('Please fill in description and amount');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end z-50">
      <div className="bg-white w-full rounded-t-2xl p-4 max-h-96 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">{entry ? 'Edit Spending Entry' : 'Add Spending Entry'}</h2>
          <button onClick={onClose}><X size={20} /></button>
        </div>
        <div className="space-y-2">
          <input type="text" placeholder="Description (e.g., Gift for Sharma)" value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg" />
          <input type="number" placeholder="Amount ₹" value={form.amount} onChange={(e) => setForm({ ...form, amount: parseInt(e.target.value) || 0 })} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg" />
          <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg" />
          <div className="flex gap-2 mt-4">
            <button onClick={handleSubmit} className={`flex-1 text-white py-2 rounded-lg font-medium text-sm ${entry ? 'bg-blue-600 hover:bg-blue-700' : 'bg-orange-600 hover:bg-orange-700'}`}>{entry ? 'Update Entry' : 'Add Entry'}</button>
            <button onClick={onClose} className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg font-medium text-sm">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}

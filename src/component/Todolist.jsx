
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './Todolist.css';

export default function TodoApp() {
    const [tasks, setTasks] = useState([]);
    const [form, setForm] = useState({
        title: '',
        description: '',
        dueDate: '',
        priority: 'Low',
        assignedTo: '',
        tags: '',
    });
    const [filter, setFilter] = useState({
        status: 'All',
        priority: 'All',
        search: '',
        tags: '',
        dateFrom: '',
        dateTo: '',
    });
    const [editId, setEditId] = useState(null);
    const [sortBy, setSortBy] = useState('dueDate');
    const [hasLoaded, setHasLoaded] = useState(false);
    // Load tasks from localStorage on mount
    useEffect(() => {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
            console.log('Loaded tasks from storage:', JSON.parse(savedTasks));
        }
        setHasLoaded(true);
    }, []);

    useEffect(() => {
        if (hasLoaded) {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }, [tasks, hasLoaded]);

    // Handle form input changes
    const handleChange = (e) =>
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

    // Add new task
    const addTask = () => {
        if (!form.title.trim()) return alert('Task title is required');

        const newTask = {
            id: uuidv4(),
            title: form.title.trim(),
            description: form.description.trim(),
            dueDate: form.dueDate || null, // normalize empty date
            priority: form.priority || 'Low',
            assignedTo: form.assignedTo.trim(),
            tags: form.tags
                ? form.tags
                    .split(',')
                    .map((tag) => tag.trim())
                    .filter((tag) => tag.length > 0)
                : [],
            status: 'Pending',
            createdAt: new Date().toISOString(),
        };

        setTasks((prev) => [...prev, newTask]);
        setForm({
            title: '',
            description: '',
            dueDate: '',
            priority: 'Low',
            assignedTo: '',
            tags: '',
        });
    };

    // Update existing task
    const updateTask = () => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === editId
                    ? {
                        ...task,
                        title: form.title.trim(),
                        description: form.description.trim(),
                        dueDate: form.dueDate || null,
                        priority: form.priority || 'Low',
                        assignedTo: form.assignedTo.trim(),
                        tags: form.tags
                            ? form.tags
                                .split(',')
                                .map((tag) => tag.trim())
                                .filter((tag) => tag.length > 0)
                            : [],
                    }
                    : task
            )
        );
        setEditId(null);
        setForm({
            title: '',
            description: '',
            dueDate: '',
            priority: 'Low',
            assignedTo: '',
            tags: '',
        });
    };

    // Delete a task
    const deleteTask = (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            setTasks((prev) => prev.filter((task) => task.id !== id));
        }
    };

    // Toggle task status
    const toggleStatus = (id, status) => {
        setTasks((prev) =>
            prev.map((task) => (task.id === id ? { ...task, status } : task))
        );
    };

    // Filter tasks with robust checks
    const filteredTasks = tasks
        .filter((task) => {
            const matchStatus = filter.status === 'All' || task.status === filter.status;
            const matchPriority = filter.priority === 'All' || task.priority === filter.priority;

            const searchLower = filter.search.toLowerCase();
            const matchSearch =
                task.title.toLowerCase().includes(searchLower) ||
                task.description.toLowerCase().includes(searchLower);

            // Tag filter: empty filter means match all, else case-insensitive check if task tags include filter tag
            const filterTag = filter.tags.trim().toLowerCase();
            const matchTags =
                !filterTag ||
                task.tags.some((tag) => tag.toLowerCase() === filterTag);

            // Date filtering, handle null dueDate
            const taskDueDate = task.dueDate ? new Date(task.dueDate) : null;
            const dateFrom = filter.dateFrom ? new Date(filter.dateFrom) : null;
            const dateTo = filter.dateTo ? new Date(filter.dateTo) : null;

            const matchDate =
                (!dateFrom || (taskDueDate && taskDueDate >= dateFrom)) &&
                (!dateTo || (taskDueDate && taskDueDate <= dateTo));

            return matchStatus && matchPriority && matchSearch && matchTags && matchDate;
        })
        .sort((a, b) => {
            if (sortBy === 'priority')
                return (
                    ['Low', 'Medium', 'High'].indexOf(b.priority) -
                    ['Low', 'Medium', 'High'].indexOf(a.priority)
                );
            if (sortBy === 'status') return a.status.localeCompare(b.status);
            return new Date(a.dueDate || 0) - new Date(b.dueDate || 0);
        });

    // Overdue check helper
    const overdue = (task) =>
        task.status !== 'Completed' && task.dueDate && new Date(task.dueDate) < new Date();

    // Priority badge component
    const PriorityBadge = ({ priority }) => {
        const classMap = {
            Low: 'badge badge-low',
            Medium: 'badge badge-medium',
            High: 'badge badge-high',
        };
        return <span className={classMap[priority]}>{priority}</span>;
    };

    return (
        <div className="todo-container">
            <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
                <h1>📋 Task Manager</h1>
            </div>

            {/* Task Form */}
            <div
                className="grid"
                style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem', margin: '1rem 0' }}
            >
                <div>
                    <label>Title *</label>
                    <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="Enter task title"
                        autoComplete="off"
                    />
                </div>
                <div>
                    <label>Description</label>
                    <input
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Enter description"
                        autoComplete="off"
                    />
                </div>
                <div>
                    <label>Due Date</label>
                    <input
                        type="date"
                        name="dueDate"
                        value={form.dueDate}
                        onChange={handleChange}
                        autoComplete="off"
                    />
                </div>
                <div>
                    <label>Priority</label>
                    <select name="priority" value={form.priority} onChange={handleChange}>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>
                <div>
                    <label>Assigned To</label>
                    <input
                        name="assignedTo"
                        value={form.assignedTo}
                        onChange={handleChange}
                        placeholder="Enter assignee name"
                        autoComplete="off"
                    />
                </div>
                <div>
                    <label>Tags</label>
                    <input
                        name="tags"
                        value={form.tags}
                        onChange={handleChange}
                        placeholder="Comma separated tags"
                        autoComplete="off"
                    />
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                    <button onClick={editId ? updateTask : addTask}>
                        {editId ? 'Update Task' : 'Add Task'}
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div
                className="grid"
                style={{ gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.5rem', marginBottom: '1rem' }}
            >
                <div>
                    <label>Search</label>
                    <input
                        placeholder="Search"
                        value={filter.search}
                        onChange={(e) => setFilter({ ...filter, search: e.target.value })}
                    />
                </div>
                <div>
                    <label>Status</label>
                    <select
                        value={filter.status}
                        onChange={(e) => setFilter({ ...filter, status: e.target.value })}
                    >
                        <option>All</option>
                        <option>Pending</option>
                        <option>In Progress</option>
                        <option>Completed</option>
                    </select>
                </div>
                <div>
                    <label>Priority</label>
                    <select
                        value={filter.priority}
                        onChange={(e) => setFilter({ ...filter, priority: e.target.value })}
                    >
                        <option>All</option>
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                    </select>
                </div>
                <div>
                    <label>Date From</label>
                    <input
                        type="date"
                        value={filter.dateFrom}
                        onChange={(e) => setFilter({ ...filter, dateFrom: e.target.value })}
                    />
                </div>
                <div>
                    <label>Date To</label>
                    <input
                        type="date"
                        value={filter.dateTo}
                        onChange={(e) => setFilter({ ...filter, dateTo: e.target.value })}
                    />
                </div>
                <div>
                    <label>Sort By</label>
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="dueDate">Sort by Due Date</option>
                        <option value="priority">Sort by Priority</option>
                        <option value="status">Sort by Status</option>
                    </select>
                </div>
            </div>

            {/* Task List by Status */}
            {['Pending', 'In Progress', 'Completed'].map((status) => (
                <div key={status} style={{ marginBottom: '2rem' }}>
                    <h2>{status} Tasks</h2>
                    <div
                        className="grid"
                        style={{
                            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                            gap: '1rem',
                            marginBottom: '1rem',
                            overflowX: 'auto',
                        }}
                    >
                        {filteredTasks.filter((t) => t.status === status).length === 0 && (
                            <p style={{ color: '#888' }}>No tasks in {status}</p>
                        )}

                        {filteredTasks
                            .filter((t) => t.status === status)
                            .map((task) => (
                                <div key={task.id} className="task-card" style={{ position: 'relative' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <h3>{task.title}</h3>
                                        <PriorityBadge priority={task.priority} />
                                    </div>
                                    <p>{task.description}</p>
                                    <p>
                                        <strong>Due:</strong> {task.dueDate || 'N/A'}{' '}
                                        {overdue(task) && (
                                            <span style={{ color: 'red', fontSize: '0.8rem' }}>⚠️ Overdue</span>
                                        )}
                                    </p>
                                    <div style={{ margin: '0.5rem 0' }}>
                                        {task.tags.map((tag) => (
                                            <span
                                                key={tag} className="tag"
                                                style={{
                                                    backgroundColor: '#eee',
                                                    borderRadius: '4px',
                                                    padding: '0 6px',
                                                    marginRight: '4px',
                                                    fontSize: '0.8rem',
                                                }}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <div style={{ fontSize: '0.85rem', color: '#555' }}>
                                        <strong>Assigned to:</strong> {task.assignedTo || 'Unassigned'}
                                    </div>
                                    <div style={{ marginTop: '0.5rem' }}>
                                        {status !== 'Completed' && (
                                            <>
                                                {status !== 'In Progress' && (
                                                    <button onClick={() => toggleStatus(task.id, 'In Progress')}>
                                                        Mark In Progress
                                                    </button>
                                                )}
                                                <button onClick={() => toggleStatus(task.id, 'Completed')}>
                                                    Mark Completed
                                                </button>
                                            </>
                                        )}
                                        {status !== 'Pending' && (
                                            <button onClick={() => toggleStatus(task.id, 'Pending')}>
                                                Mark Pending
                                            </button>
                                        )}
                                        <button
                                            onClick={() => {
                                                setEditId(task.id);
                                                setForm({
                                                    title: task.title,
                                                    description: task.description,
                                                    dueDate: task.dueDate || '',
                                                    priority: task.priority,
                                                    assignedTo: task.assignedTo,
                                                    tags: task.tags.join(', '),
                                                });
                                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                            }}
                                        >
                                            <FaEdit />
                                        </button>
                                        <button onClick={() => deleteTask(task.id)}>
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            ))}
        </div>
    );
}


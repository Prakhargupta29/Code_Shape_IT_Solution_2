import React, { useState, useEffect } from 'react';
import './ContentManagement.css';

const initialContent = [
    { id: 1, title: '10 Tips for Better Content Management', author: 'John Doe', category: 'Tutorials', status: 'Published', date: '2025-06-08' },
    { id: 2, title: 'The Future of Content Management Systems', author: 'Jane Smith', category: 'News', status: 'Draft', date: '2025-06-05' },
    { id: 3, title: 'Best CMS Platforms of 2023', author: 'Mike Johnson', category: 'Reviews', status: 'Published', date: '2025-06-01' },
    { id: 4, title: 'How to Optimize Your Content SEO', author: 'Anna Lee', category: 'Tutorials', status: 'Published', date: '2025-05-25' },
    { id: 5, title: 'Content Marketing Trends to Watch', author: 'Robert Brown', category: 'News', status: 'Published', date: '2025-05-20' },
    { id: 6, title: 'In-depth Review: WordPress vs. Joomla', author: 'Catherine Green', category: 'Reviews', status: 'Draft', date: '2025-05-15' },
    { id: 7, title: 'Creating Engaging Blog Content', author: 'James White', category: 'Tutorials', status: 'Published', date: '2025-05-10' },
    { id: 8, title: 'Latest Updates in CMS Security', author: 'Emily Black', category: 'News', status: 'Published', date: '2025-05-05' },
    { id: 9, title: 'Top 5 CMS Plugins for SEO', author: 'David Wilson', category: 'Reviews', status: 'Published', date: '2025-05-01' },
    { id: 10, title: 'Managing Content Workflow Effectively', author: 'Laura Adams', category: 'Tutorials', status: 'Draft', date: '2025-04-25' },
    { id: 11, title: 'How AI is Changing Content Creation', author: 'Chris Evans', category: 'News', status: 'Published', date: '2025-04-20' },
];

const ContentManagementPage = () => {
    // Load from localStorage or fallback to initialContent
    const [contents, setContents] = useState(() => {
        const saved = localStorage.getItem('contents');
        return saved ? JSON.parse(saved) : initialContent;
    });
    const [filteredContents, setFilteredContents] = useState(contents);
    const [formData, setFormData] = useState({ title: '', body: '', category: '', tags: '', status: 'Draft', media: null });
    const [editingId, setEditingId] = useState(null);

    // Sync filtered contents whenever contents changes
    useEffect(() => {
        setFilteredContents(contents);
        // Save contents to localStorage whenever it changes
        localStorage.setItem('contents', JSON.stringify(contents));
    }, [contents]);

    const handleSort = (criteria) => {
        const sorted = [...filteredContents].sort((a, b) => {
            if (criteria === 'date') {
                return new Date(b.date) - new Date(a.date); // newest first
            } else if (criteria === 'title') {
                return a.title.localeCompare(b.title);
            } else if (criteria === 'author') {
                return a.author.localeCompare(b.author);
            } else if (criteria === 'status') {
                return a.status.localeCompare(b.status);
            }
            return 0;
        });
        setFilteredContents(sorted);
    };

    const handleFilter = (category) => {
        setFilteredContents(contents.filter(c => c.category === category || category === 'All'));
    };

    const handleSubmit = () => {
        if (!formData.title.trim() || !formData.category.trim()) {
            alert('Title and Category are required.');
            return;
        }

        const mediaPreview = formData.media
            ? URL.createObjectURL(formData.media)
            : formData.mediaPreview || null; // retain old media preview if no new file

        const newContent = {
            ...formData,
            id: editingId !== null ? editingId : Date.now(),
            date: new Date().toISOString().split('T')[0],
            author: 'Admin',
            mediaPreview,
        };

        if (editingId !== null) {
            setContents(prev =>
                prev.map(c => c.id === editingId ? newContent : c)
            );
        } else {
            setContents(prev => [...prev, newContent]);
        }

        resetForm();
    };




    const handleEdit = (content) => {
        setFormData({
            title: content.title || '',
            body: content.body || '',
            category: content.category || '',
            tags: content.tags || '',
            status: content.status || 'Draft',
            media: null,
            mediaPreview: content.mediaPreview || null // <-- Add this line
        });
        setEditingId(content.id);

        setTimeout(() => {
            document.querySelector('.content-form')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };



    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this content?')) {
            setContents(prev => prev.filter(c => c.id !== id));
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            body: '',
            category: '',
            tags: '',
            status: 'Draft',
            media: null,
            mediaPreview: null
        });
        setEditingId(null);
    };


    return (
        <div className="content-page">
            <h1>Content Management</h1>

            <div className="filter-sort">
                <select onChange={e => handleFilter(e.target.value)}>
                    <option value="All">All Categories</option>
                    <option value="Tutorials">Tutorials</option>
                    <option value="News">News</option>
                    <option value="Reviews">Reviews</option>
                </select>
                <select onChange={(e) => handleSort(e.target.value)}>
                    <option value="date">Sort by Date (Newest First)</option>
                    <option value="title">Sort by Title (A-Z)</option>
                    <option value="author">Sort by Author (A-Z)</option>
                    <option value="status">Sort by Status</option>
                </select>
            </div>

            <div className="content-list">
                {filteredContents.map(c => (
                    <div key={c.id} className="content-card">
                        <h3>{c.title}</h3>
                        <p><strong>Author:</strong> {c.author}</p>
                        <p><strong>Category:</strong> {c.category}</p>
                        <p><strong>Status:</strong> {c.status}</p>
                        <p><strong>Date:</strong> {c.date}</p>

                        {/* Render media preview if available */}
                        {c.mediaPreview && (
                            <>
                                {c.mediaPreview.match(/\.(jpeg|jpg|gif|png|webp)$/i) ? (
                                    <img src={c.mediaPreview} alt="Uploaded" className="content-media" />
                                ) : (
                                    <a href={c.mediaPreview} target="_blank" rel="noopener noreferrer">
                                        View Uploaded File
                                    </a>
                                )}
                            </>
                        )}

                        <button onClick={() => handleEdit(c)}>Edit</button>
                        <button onClick={() => handleDelete(c.id)}>Delete</button>
                    </div>


                ))}
            </div>

            <div className="content-form">
                <h2>{editingId ? 'Edit Content' : 'Create New Content'}</h2>

                <div className="content-form-group">
                    <input
                        placeholder="Title"
                        value={formData.title}
                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                        required
                    />
                    <input
                        placeholder="Category"
                        value={formData.category}
                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                        required
                    />
                </div>

                <textarea
                    placeholder="Body"
                    value={formData.body}
                    onChange={e => setFormData({ ...formData, body: e.target.value })}
                ></textarea>

                <div className="content-form-group">
                    <select
                        value={formData.status}
                        onChange={e => setFormData({ ...formData, status: e.target.value })}
                    >
                        <option value="Draft">Draft</option>
                        <option value="Published">Published</option>
                    </select>
                </div>

                <input type="file" onChange={e => setFormData({ ...formData, media: e.target.files[0] })} />
                {formData.media && <p>Uploaded: {formData.media.name}</p>}

                <div className="content-form-buttons">
                    <button onClick={handleSubmit}>{editingId ? 'Save Changes' : 'Create Content'}</button>
                    {editingId && <button onClick={resetForm}>Cancel Edit</button>}
                </div>
            </div>


        </div>
    );
};

export default ContentManagementPage;

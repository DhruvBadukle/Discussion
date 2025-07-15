import React, { useState } from 'react';
import Navbar from './Navbar';
import { FiPlus, FiTrash2, FiEdit2 } from 'react-icons/fi';

const Home = () => {
  const [question, setQuestion] = useState('');
  const [description, setDescription] = useState('');
  const [posts, setPosts] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!question.trim()) {
      setError('Question is required');
      return;
    }
    
    if (!description.trim()) {
      setError('Description is required');
      return;
    }

    if (isEditing !== null) {
      // Update existing post
      setPosts(posts.map(post => 
        post.id === isEditing ? { ...post, question, description } : post
      ));
      setIsEditing(null);
    } else {
      // Add new post
      const newPost = { 
        id: Date.now(), 
        question, 
        description,
        createdAt: new Date().toISOString()
      };
      setPosts([newPost, ...posts]);
    }
    
    setQuestion('');
    setDescription('');
  };

  const handleDelete = (id) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  const handleEdit = (post) => {
    setQuestion(post.question);
    setDescription(post.description);
    setIsEditing(post.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500">
      <Navbar />
      
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Create Post Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <FiPlus className="mr-2" />
              {isEditing !== null ? 'Edit Post' : 'Create New Post'}
            </h2>
            
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                <p className="text-red-700">{error}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-1">
                  Question
                </label>
                <input
                  id="question"
                  type="text"
                  placeholder="What's your question?"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  rows={4}
                  placeholder="Provide more details about your question..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                {isEditing !== null && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(null);
                      setQuestion('');
                      setDescription('');
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                )}
                
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition flex items-center"
                >
                  {isEditing !== null ? (
                    <>
                      <FiEdit2 className="mr-2" />
                      Update Post
                    </>
                  ) : (
                    <>
                      <FiPlus className="mr-2" />
                      Create Post
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
        
        {/* Posts List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Posts</h2>
          
          {posts.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 text-center">
              <p className="text-gray-500">No posts yet. Be the first to create one!</p>
            </div>
          ) : (
            posts.map(post => (
              <div key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{post.question}</h3>
                    <span className="text-xs text-gray-500">
                      {formatDate(post.createdAt)}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 whitespace-pre-line">{post.description}</p>
                  
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => handleEdit(post)}
                      className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition flex items-center"
                    >
                      <FiEdit2 className="mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="px-3 py-1 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition flex items-center"
                    >
                      <FiTrash2 className="mr-1" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
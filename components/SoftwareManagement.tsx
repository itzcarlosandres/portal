import React, { useState, useEffect } from 'react';
import { Software, Category, Author, Platform, License, Requirement } from '../types';
import { TrashIcon, PlusIcon, EditIcon, UploadIcon } from './IconComponents';
import IconRenderer from './IconRenderer';

interface SoftwareManagementProps {
    softwareList: Software[];
    categories: Category[];
    authors: Author[];
    platforms: Platform[];
    licenses: License[];
    requirements: Requirement[];
    onSaveSoftware: (software: Software) => void;
    onDeleteSoftware: (id: string) => void;
    onAddCategory: (category: Category) => boolean;
    onAddAuthor: (author: Author) => boolean;
}

const emptySoftware: Omit<Software, 'id'> = {
    name: '',
    slug: '',
    logo: '',
    screenshots: [],
    category: '',
    description: '',
    detailedDescription: '',
    rating: 0,
    reviews: [],
    downloads: 0,
    version: '',
    size: 0,
    unit: 'MB',
    downloadUrl: '',
    author: '',
    platform: '',
    license: '',
    requirements: '',
};

// FIX: Defined a specific props type for SoftwareForm to include softwareToEdit and onCancel.
interface SoftwareFormProps extends Omit<SoftwareManagementProps, 'softwareList' | 'onDeleteSoftware'> {
    softwareToEdit: Software | null;
    onCancel: () => void;
}

const SoftwareForm: React.FC<SoftwareFormProps> = 
({ categories, authors, platforms, licenses, requirements, onSaveSoftware, onAddCategory, onAddAuthor, softwareToEdit, onCancel }) => {
    const [software, setSoftware] = useState<Software | Omit<Software, 'id'>>(softwareToEdit || emptySoftware);
    const [newAuthor, setNewAuthor] = useState('');
    const [newCategory, setNewCategory] = useState('');

    useEffect(() => {
        if (softwareToEdit) {
            setSoftware(softwareToEdit);
        } else {
            setSoftware(emptySoftware);
        }
    }, [softwareToEdit]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setSoftware(prev => ({ ...prev, [name]: value }));

        if (name === 'name') {
            const newSlug = value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
            setSoftware(prev => ({ ...prev, slug: newSlug }));
        }
    };
    
    const handleUnitChange = (unit: 'KB' | 'MB' | 'GB') => {
        setSoftware(prev => ({ ...prev, unit }));
    };

    const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setSoftware(prev => ({...prev, [name]: checked }));
    };

    // FIX: Refactored to a standard for-loop to ensure correct type inference for `file` as `File`, which is compatible with `Blob`.
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'logo' | 'screenshots') => {
        if (e.target.files) {
            for (let i = 0; i < e.target.files.length; i++) {
                const file = e.target.files.item(i);
                if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        if (field === 'logo') {
                            setSoftware(prev => ({ ...prev, logo: reader.result as string }));
                        } else {
                            setSoftware(prev => ({ ...prev, screenshots: [...prev.screenshots, reader.result as string] }));
                        }
                    };
                    reader.readAsDataURL(file);
                }
            }
        }
    };
    
    const handleAddNewAuthor = () => {
        if (newAuthor && onAddAuthor(newAuthor)) {
            setSoftware(prev => ({...prev, author: newAuthor}));
            setNewAuthor('');
        } else if(newAuthor) {
            alert(`Author "${newAuthor}" already exists.`);
        }
    };
    
    const handleAddNewCategory = () => {
         if (newCategory && onAddCategory(newCategory)) {
            setSoftware(prev => ({...prev, category: newCategory}));
            setNewCategory('');
        } else if(newCategory) {
            alert(`Category "${newCategory}" already exists.`);
        }
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const finalSoftware: Software = 'id' in software 
            ? software 
            : { ...software, id: String(Date.now()) };
        onSaveSoftware(finalSoftware);
        onCancel();
    };

    const FileInput: React.FC<{ label: string; field: 'logo' | 'screenshots'; multiple?: boolean }> = ({ label, field, multiple }) => (
        <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">{label}</label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-slate-600 px-6 py-10">
                <div className="text-center">
                    <UploadIcon className="mx-auto h-12 w-12 text-slate-500" />
                    <div className="mt-4 flex text-sm leading-6 text-slate-400">
                        <label htmlFor={field} className="relative cursor-pointer rounded-md bg-slate-800 font-semibold text-sky-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-sky-600 focus-within:ring-offset-2 focus-within:ring-offset-slate-900 hover:text-sky-500">
                            <span>Upload files</span>
                            <input id={field} name={field} type="file" className="sr-only" multiple={multiple} accept="image/*" onChange={(e) => handleFileChange(e, field)} />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                    </div>
                </div>
            </div>
             <div className="flex flex-wrap gap-2 mt-2">
                {field === 'logo' && software.logo.startsWith('data:image') && <img src={software.logo} className="h-16 w-16 object-cover rounded" />}
                {field === 'screenshots' && software.screenshots.map((src, i) => <img key={i} src={src} className="h-16 w-16 object-cover rounded" />)}
            </div>
        </div>
    );
    
    return (
         <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
                 <h2 className="text-xl font-bold text-white mb-4">Basic Information</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">Name</label>
                        <input type="text" name="name" value={software.name} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-md text-slate-200 px-3 py-2" required />
                    </div>
                    <div>
                        <label htmlFor="slug" className="block text-sm font-medium text-slate-300 mb-1">Slug</label>
                        <input type="text" name="slug" value={software.slug} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-md text-slate-200 px-3 py-2" />
                    </div>
                    <div>
                        <label htmlFor="version" className="block text-sm font-medium text-slate-300 mb-1">Version</label>
                        <input type="text" name="version" value={software.version} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-md text-slate-200 px-3 py-2" required />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <label htmlFor="size" className="block text-sm font-medium text-slate-300 mb-1">Size</label>
                            <input type="number" name="size" value={software.size} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-md text-slate-200 px-3 py-2" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Unit</label>
                            <div className="flex items-center gap-4 mt-2">
                                {['KB', 'MB', 'GB'].map(u => (
                                    <label key={u} className="flex items-center gap-1 text-sm"><input type="radio" checked={software.unit === u} onChange={() => handleUnitChange(u as any)} className="form-radio bg-slate-700" /> {u}</label>
                                ))}
                            </div>
                        </div>
                    </div>
                     <div>
                        <label htmlFor="downloadUrl" className="block text-sm font-medium text-slate-300 mb-1">Download URL</label>
                        <input type="url" name="downloadUrl" value={software.downloadUrl} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-md text-slate-200 px-3 py-2" required />
                    </div>
                     <div>
                        <label htmlFor="buyUrl" className="block text-sm font-medium text-slate-300 mb-1">Buy/Affiliate URL (Optional)</label>
                        <input type="url" name="buyUrl" value={software.buyUrl || ''} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-md text-slate-200 px-3 py-2" />
                    </div>
                    <FileInput label="Logo" field="logo" />
                    <FileInput label="Screenshots (Optional)" field="screenshots" multiple />
                 </div>
            </div>
            
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
                 <h2 className="text-xl font-bold text-white mb-4">Additional Information</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                         <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-1">Short Description</label>
                         <textarea name="description" value={software.description} onChange={handleChange} rows={3} className="w-full bg-slate-700 border border-slate-600 rounded-md text-slate-200 px-3 py-2" required></textarea>
                    </div>
                    <div>
                         <label htmlFor="detailedDescription" className="block text-sm font-medium text-slate-300 mb-1">Detailed Description</label>
                         <textarea name="detailedDescription" value={software.detailedDescription} onChange={handleChange} rows={3} className="w-full bg-slate-700 border border-slate-600 rounded-md text-slate-200 px-3 py-2" required></textarea>
                    </div>
                     <div>
                        <label htmlFor="author" className="block text-sm font-medium text-slate-300 mb-1">Author</label>
                        <div className="flex gap-2">
                            <select name="author" value={software.author} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-md text-slate-200 px-3 py-2" required>
                                <option value="">Select Author</option>
                                {authors.map(a => <option key={a} value={a}>{a}</option>)}
                            </select>
                            <input type="text" value={newAuthor} onChange={e => setNewAuthor(e.target.value)} placeholder="New Author" className="bg-slate-700 border border-slate-600 rounded-md px-3 py-2" />
                            <button type="button" onClick={handleAddNewAuthor} className="p-2 bg-sky-600 rounded-md"><PlusIcon className="w-5 h-5"/></button>
                        </div>
                    </div>
                     <div>
                        <label htmlFor="category" className="block text-sm font-medium text-slate-300 mb-1">Category</label>
                         <div className="flex gap-2">
                            <select name="category" value={software.category} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-md text-slate-200 px-3 py-2" required>
                                 <option value="">Select Category</option>
                                {categories.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                            <input type="text" value={newCategory} onChange={e => setNewCategory(e.target.value)} placeholder="New Category" className="bg-slate-700 border border-slate-600 rounded-md px-3 py-2" />
                            <button type="button" onClick={handleAddNewCategory} className="p-2 bg-sky-600 rounded-md"><PlusIcon className="w-5 h-5"/></button>
                        </div>
                    </div>
                    <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                         <div>
                            <label htmlFor="platform" className="block text-sm font-medium text-slate-300 mb-1">Platform</label>
                            <select name="platform" value={software.platform} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-md text-slate-200 px-3 py-2" required>
                                <option value="">Select Platform</option>
                                {platforms.map(p => <option key={p} value={p}>{p}</option>)}
                            </select>
                        </div>
                         <div>
                            <label htmlFor="license" className="block text-sm font-medium text-slate-300 mb-1">License</label>
                            <select name="license" value={software.license} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-md text-slate-200 px-3 py-2" required>
                                <option value="">Select License</option>
                                {licenses.map(l => <option key={l} value={l}>{l}</option>)}
                            </select>
                        </div>
                         <div>
                            <label htmlFor="requirements" className="block text-sm font-medium text-slate-300 mb-1">Requirements</label>
                            <select name="requirements" value={software.requirements} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-md text-slate-200 px-3 py-2" required>
                                <option value="">Select Requirements</option>
                                {requirements.map(r => <option key={r} value={r}>{r}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="flex items-center gap-8">
                         <label className="flex items-center gap-2 text-sm font-medium text-slate-300 cursor-pointer">
                            <input type="checkbox" name="isFeatured" checked={software.isFeatured || false} onChange={handleToggle} className="form-checkbox bg-slate-700 rounded" />
                            Featured
                        </label>
                        <label className="flex items-center gap-2 text-sm font-medium text-slate-300 cursor-pointer">
                            <input type="checkbox" name="isSponsored" checked={software.isSponsored || false} onChange={handleToggle} className="form-checkbox bg-slate-700 rounded" />
                            Sponsored
                        </label>
                    </div>
                 </div>
            </div>
            
            <div className="flex justify-end gap-4">
                <button type="button" onClick={onCancel} className="px-6 py-2 bg-slate-700 text-white font-semibold rounded-md hover:bg-slate-600">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-sky-600 text-white font-semibold rounded-md hover:bg-sky-700">Save Software</button>
            </div>
         </form>
    );
};


const SoftwareManagement: React.FC<SoftwareManagementProps> = (props) => {
    const { softwareList, onDeleteSoftware } = props;
    const [view, setView] = useState<'list' | 'form'>('list');
    const [softwareToEdit, setSoftwareToEdit] = useState<Software | null>(null);

    const handleAddNew = () => {
        setSoftwareToEdit(null);
        setView('form');
    };

    const handleEdit = (software: Software) => {
        setSoftwareToEdit(software);
        setView('form');
    };
    
    const handleCancel = () => {
        setSoftwareToEdit(null);
        setView('list');
    };

    return (
        <div>
            {view === 'list' ? (
                <>
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold text-white">Software Management</h1>
                        <button onClick={handleAddNew} className="flex items-center gap-2 px-4 py-2 bg-sky-600 text-white font-semibold rounded-md hover:bg-sky-700">
                            <PlusIcon className="w-5 h-5" /> New Software
                        </button>
                    </div>
                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-max text-left">
                                <thead className="bg-slate-800">
                                    <tr>
                                        <th className="p-4 text-sm font-semibold text-slate-300">Logo</th>
                                        <th className="p-4 text-sm font-semibold text-slate-300">Name</th>
                                        <th className="p-4 text-sm font-semibold text-slate-300">Category</th>
                                        <th className="p-4 text-sm font-semibold text-slate-300">Version</th>
                                        <th className="p-4 text-sm font-semibold text-slate-300">Platform</th>
                                        <th className="p-4 text-sm font-semibold text-slate-300">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {softwareList.map(app => (
                                        <tr key={app.id} className="border-t border-slate-700/50">
                                            <td className="p-4">
                                                <IconRenderer source={app.logo} className="w-8 h-8 text-slate-400" />
                                            </td>
                                            <td className="p-4 font-medium text-white">{app.name}</td>
                                            <td className="p-4 text-slate-300">{app.category}</td>
                                            <td className="p-4 text-slate-300">{app.version}</td>
                                            <td className="p-4 text-slate-300">{app.platform}</td>
                                            <td className="p-4 flex gap-2">
                                                <button onClick={() => handleEdit(app)} className="text-sky-400 hover:text-sky-300 p-2 rounded-full hover:bg-sky-500/10">
                                                    <EditIcon className="w-5 h-5" />
                                                </button>
                                                <button onClick={() => onDeleteSoftware(app.id)} className="text-red-500 hover:text-red-400 p-2 rounded-full hover:bg-red-500/10">
                                                    <TrashIcon className="w-5 h-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            ) : (
                 <>
                    <h1 className="text-3xl font-bold text-white mb-8">{softwareToEdit ? 'Edit Software' : 'Add New Software'}</h1>
                    <SoftwareForm {...props} softwareToEdit={softwareToEdit} onCancel={handleCancel} />
                 </>
            )}
        </div>
    );
};

export default SoftwareManagement;
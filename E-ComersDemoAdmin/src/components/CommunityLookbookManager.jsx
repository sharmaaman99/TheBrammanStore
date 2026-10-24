import React, { useState, useEffect } from 'react';
import { 
  Camera, Check, X, Tag, Heart, Plus, Sparkles, 
  ExternalLink, Filter, MapPin, Eye, RefreshCw, CheckCircle, Trash2
} from 'lucide-react';
import { API_BASE_URL } from '../config/api';

export default function CommunityLookbookManager({ products = [] }) {
  const [looks, setLooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all' | 'curated' | 'pending'
  const [editingTagsId, setEditingTagsId] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Form states for new look
  const [newHandle, setNewHandle] = useState('');
  const [newName, setNewName] = useState('');
  const [newImage, setNewImage] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [newLikes, setNewLikes] = useState('1200');
  const [newTaggedProducts, setNewTaggedProducts] = useState([]);
  const [newCurated, setNewCurated] = useState(true);

  const fallbackLooks = [
    {
      id: "look-01",
      creatorHandle: "@kabir.raw",
      creatorName: "Kabir Rawat",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces",
      city: "Mumbai, MH",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&auto=format&fit=crop&q=80",
      taggedProducts: ["kundalini", "parshuram"],
      taggedProductHandles: ["kundalini", "parshuram"],
      likes: 3420,
      caption: "Layered the Kundalini 260 GSM boxy cut with distressed tech cargo. Heavy drape holds posture all evening.",
      curated: true,
      curationStatus: "approved",
      createdAt: "2026-10-21T14:20:00.000Z"
    },
    {
      id: "look-02",
      creatorHandle: "@ananya_delhi",
      creatorName: "Ananya Sen",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&h=120&fit=crop&crop=faces",
      city: "New Delhi, DL",
      image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=900&auto=format&fit=crop&q=80",
      taggedProducts: ["tat-tvam-asi"],
      taggedProductHandles: ["tat-tvam-asi"],
      likes: 2890,
      caption: "Thou Art That in Raw Cream. Minimal shloka puff print in brutalist Connaught Place shadows.",
      curated: true,
      curationStatus: "approved",
      createdAt: "2026-10-21T18:45:00.000Z"
    },
    {
      id: "look-03",
      creatorHandle: "@zayd_streetwear",
      creatorName: "Zayd Merchant",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces",
      city: "Bengaluru, KA",
      image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=900&auto=format&fit=crop&q=80",
      taggedProducts: ["indra"],
      taggedProductHandles: ["indra"],
      likes: 1950,
      caption: "Indra drop shoulder tee on concrete terraces. High density loopknit that doesn't collapse.",
      curated: true,
      curationStatus: "approved",
      createdAt: "2026-10-22T09:12:00.000Z"
    },
    {
      id: "look-04",
      creatorHandle: "@priya_k_vault",
      creatorName: "Priya Kapoor",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=faces",
      city: "Kolkata, WB",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=900&auto=format&fit=crop&q=80",
      taggedProducts: ["kaal", "bodhi"],
      taggedProductHandles: ["kaal", "bodhi"],
      likes: 4120,
      caption: "400 GSM French Terry Kaal hoodie. Thermal silhouette feels like wearable architecture.",
      curated: true,
      curationStatus: "approved",
      createdAt: "2026-10-22T13:30:00.000Z"
    },
    {
      id: "look-05",
      creatorHandle: "@arjun_archival",
      creatorName: "Arjun Verma",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=faces",
      city: "Chandigarh, PB",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=900&auto=format&fit=crop&q=80",
      taggedProducts: ["parshuram"],
      taggedProductHandles: ["parshuram"],
      likes: 2540,
      caption: "Warrior asceticism. Parshuram backprint silkscreen detailing up close.",
      curated: true,
      curationStatus: "approved",
      createdAt: "2026-10-22T16:05:00.000Z"
    },
    {
      id: "look-06",
      creatorHandle: "@dev_sharma_",
      creatorName: "Dev Sharma",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&h=120&fit=crop&crop=faces",
      city: "Hyderabad, TS",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=900&auto=format&fit=crop&q=80",
      taggedProducts: ["maya", "shunya"],
      taggedProductHandles: ["maya", "shunya"],
      likes: 3105,
      caption: "Maya pastel sweatshirt with Shunya minimal styling. High luxury Bharat street code.",
      curated: true,
      curationStatus: "approved",
      createdAt: "2026-10-22T19:50:00.000Z"
    },
    {
      id: "look-07",
      creatorHandle: "@rohan.street",
      creatorName: "Rohan V.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=faces",
      city: "Pune, MH",
      image: "https://images.unsplash.com/photo-1520975954732-35dd22299614?w=900&auto=format&fit=crop&q=80",
      taggedProducts: ["kundalini"],
      taggedProductHandles: ["kundalini"],
      likes: 540,
      caption: "Clean oversized fit with chunky runners in KP Pune.",
      curated: false,
      curationStatus: "pending",
      createdAt: "2026-10-23T06:10:00.000Z"
    },
    {
      id: "look-08",
      creatorHandle: "@meera.stylelab",
      creatorName: "Meera Menon",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces",
      city: "Kochi, KL",
      image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=900&auto=format&fit=crop&q=80",
      taggedProducts: ["bodhi"],
      taggedProductHandles: ["bodhi"],
      likes: 720,
      caption: "Bodhi slate sweatshirt paired with linen wide-leg pants.",
      curated: false,
      curationStatus: "pending",
      createdAt: "2026-10-23T08:30:00.000Z"
    }
  ];

  const fetchLooks = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/lookbook?all=true`);
      if (res.ok) {
        const data = await res.json();
        setLooks(data.posts || fallbackLooks);
      } else {
        setLooks(fallbackLooks);
      }
    } catch {
      setLooks(fallbackLooks);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLooks();
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleToggleCuration = async (look) => {
    const nextCurated = !look.curated;
    try {
      const res = await fetch(`${API_BASE_URL}/api/lookbook/${look.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          curated: nextCurated,
          curationStatus: nextCurated ? 'approved' : 'pending'
        })
      });

      if (res.ok) {
        setLooks(prev => prev.map(l => l.id === look.id ? { ...l, curated: nextCurated, curationStatus: nextCurated ? 'approved' : 'pending' } : l));
        showToast(nextCurated ? `Look ${look.id} curated for storefront.` : `Look ${look.id} moved to pending.`);
      }
    } catch {
      setLooks(prev => prev.map(l => l.id === look.id ? { ...l, curated: nextCurated } : l));
      showToast(nextCurated ? `Look ${look.id} marked curated (local).` : `Look ${look.id} set to pending.`);
    }
  };

  const handleBoostLikes = async (look, amount = 100) => {
    const updatedLikes = (look.likes || 0) + amount;
    try {
      await fetch(`${API_BASE_URL}/api/lookbook/${look.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ likes: updatedLikes })
      });
      setLooks(prev => prev.map(l => l.id === look.id ? { ...l, likes: updatedLikes } : l));
      showToast(`Likes boosted (+${amount}) for ${look.creatorHandle}`);
    } catch {
      setLooks(prev => prev.map(l => l.id === look.id ? { ...l, likes: updatedLikes } : l));
    }
  };

  const handleOpenTagEditor = (look) => {
    setEditingTagsId(look.id);
    setSelectedTags(look.taggedProducts || look.taggedProductHandles || []);
  };

  const handleSaveTags = async (lookId) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/lookbook/${lookId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          taggedProducts: selectedTags,
          taggedProductHandles: selectedTags
        })
      });
      if (res.ok) {
        setLooks(prev => prev.map(l => l.id === lookId ? {
          ...l,
          taggedProducts: selectedTags,
          taggedProductHandles: selectedTags
        } : l));
        showToast(`Product linkages updated for ${lookId}`);
      }
    } catch {
      setLooks(prev => prev.map(l => l.id === lookId ? { ...l, taggedProducts: selectedTags } : l));
      showToast('Tags updated.');
    } finally {
      setEditingTagsId(null);
    }
  };

  const handleDeleteLook = async (lookId) => {
    if (!window.confirm(`Are you sure you want to remove look ${lookId}?`)) return;
    try {
      await fetch(`${API_BASE_URL}/api/lookbook/${lookId}`, { method: 'DELETE' });
      setLooks(prev => prev.filter(l => l.id !== lookId));
      showToast(`Look ${lookId} removed from lookbook archive.`);
    } catch {
      setLooks(prev => prev.filter(l => l.id !== lookId));
      showToast(`Look ${lookId} deleted.`);
    }
  };

  const handleCreateLook = async (e) => {
    e.preventDefault();
    if (!newHandle || !newImage) {
      alert('Creator handle and Image URL are required.');
      return;
    }

    const payload = {
      creatorHandle: newHandle,
      creatorName: newName || newHandle.replace('@', ''),
      image: newImage,
      city: newCity || "Bharat",
      caption: newCaption || "Curated streetwear look from The Brahmman archive.",
      likes: parseInt(newLikes, 10) || 0,
      taggedProducts: newTaggedProducts,
      taggedProductHandles: newTaggedProducts,
      curated: newCurated
    };

    try {
      const res = await fetch(`${API_BASE_URL}/api/lookbook`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const data = await res.json();
        setLooks(prev => [data.post, ...prev]);
        showToast(`New look created by ${payload.creatorHandle}`);
        setShowAddModal(false);
        // Reset
        setNewHandle('');
        setNewName('');
        setNewImage('');
        setNewCity('');
        setNewCaption('');
        setNewTaggedProducts([]);
      }
    } catch {
      showToast('Look saved locally.');
      setShowAddModal(false);
    }
  };

  // Filtered list
  const filteredLooks = looks.filter(look => {
    if (filter === 'curated') return look.curated === true;
    if (filter === 'pending') return look.curated !== true;
    return true;
  });

  const curatedCount = looks.filter(l => l.curated).length;
  const pendingCount = looks.filter(l => !l.curated).length;

  // Available product catalog handles
  const availableHandles = products.length > 0
    ? products.map(p => ({ handle: p.handle, title: p.title }))
    : [
        { handle: 'kundalini', title: 'KUNDALINI / कुण्डलिनी' },
        { handle: 'tat-tvam-asi', title: 'TAT TVAM ASI' },
        { handle: 'indra', title: 'INDRA / इंद्र' },
        { handle: 'parshuram', title: 'PARSHURAM / परशुराम' },
        { handle: 'kaal', title: 'KAAL / काल HOODIE' },
        { handle: 'maya', title: 'MAYA / माया SWEATSHIRT' },
        { handle: 'shunya', title: 'SHUNYA / शून्य' },
        { handle: 'bodhi', title: 'BODHI / बोधि' }
      ];

  return (
    <div className="bg-white dark:bg-[#141824] border border-[#e5e5e5] dark:border-[#2b3548] rounded-2xl font-sans text-xs overflow-hidden shadow-xs relative text-[#141824] dark:text-[#f8fafc]">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-black dark:bg-[#3874ff] text-white px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 text-xs animate-fadeIn font-mono">
          <CheckCircle className="w-4 h-4 text-emerald-400 dark:text-white" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner Header */}
      <div className="p-5 border-b border-[#e5e5e5] dark:border-[#2b3548] bg-[#f8f8f7] dark:bg-[#182030] flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <h3 className="font-heading font-extrabold text-base sm:text-lg text-black dark:text-white uppercase tracking-wider">
              COMMUNITY LOOKBOOK CURATION CHAMBER
            </h3>
          </div>
          <p className="text-[11px] text-neutral-500 dark:text-slate-400 mt-0.5">
            Manage user-submitted street styling, moderate archive UGC, and link editorial silhouettes to store inventory.
          </p>
        </div>

        {/* Quick Action Badges */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-3.5 py-1.5 bg-black dark:bg-[#3874ff] text-white rounded-full font-semibold hover:bg-neutral-800 dark:hover:bg-[#2563eb] transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Community Look</span>
          </button>
          <button
            onClick={fetchLooks}
            className="p-1.5 bg-white dark:bg-[#182030] border border-neutral-200 dark:border-[#2b3548] hover:border-black dark:hover:border-white rounded-full text-neutral-600 dark:text-slate-300 transition-colors"
            title="Refresh Lookbook"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-black dark:text-white' : ''}`} />
          </button>
        </div>
      </div>

      {/* Filter Tabs & Stats Bar */}
      <div className="px-5 py-3 border-b border-[#e5e5e5] dark:border-[#2b3548] bg-[#fafaf9] dark:bg-[#101420] flex flex-wrap items-center justify-between gap-3 font-mono text-[11px]">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-full border transition-all ${
              filter === 'all'
                ? 'bg-black text-white border-black font-bold'
                : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400'
            }`}
          >
            ALL SUBMISSIONS ({looks.length})
          </button>
          <button
            onClick={() => setFilter('curated')}
            className={`px-3 py-1 rounded-full border transition-all flex items-center gap-1.5 ${
              filter === 'curated'
                ? 'bg-emerald-600 text-white border-emerald-600 font-bold'
                : 'bg-white text-emerald-800 border-emerald-200 hover:border-emerald-500'
            }`}
          >
            <Sparkles className="w-3 h-3 text-emerald-300" />
            <span>CURATED FOR STOREFRONT ({curatedCount})</span>
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-3 py-1 rounded-full border transition-all ${
              filter === 'pending'
                ? 'bg-amber-600 text-white border-amber-600 font-bold'
                : 'bg-white text-amber-800 border-amber-200 hover:border-amber-500'
            }`}
          >
            PENDING MODERATION ({pendingCount})
          </button>
        </div>

        <div className="text-neutral-500 text-[10px]">
          <span>STOREFRONT LOOKBOOK DISPLAY: EXACTLY {curatedCount} FEATURED LOOKS</span>
        </div>
      </div>

      {/* Looks Grid */}
      <div className="p-5">
        {loading && looks.length === 0 ? (
          <div className="py-16 text-center text-neutral-400 font-mono">
            Loading Brahmman Community Lookbook archive...
          </div>
        ) : filteredLooks.length === 0 ? (
          <div className="py-16 text-center text-neutral-400 font-mono">
            No styling looks found in "{filter}" filter.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLooks.map((look) => {
              const isCurated = look.curated === true;
              const tags = look.taggedProducts || look.taggedProductHandles || [];

              return (
                <div
                  key={look.id}
                  className={`group rounded-2xl border transition-all duration-200 overflow-hidden bg-white flex flex-col justify-between ${
                    isCurated
                      ? 'border-neutral-300 hover:border-black shadow-xs'
                      : 'border-amber-200 bg-amber-50/20'
                  }`}
                >
                  {/* Card Header: Creator & Status */}
                  <div className="p-3.5 border-b border-neutral-100 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={look.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces"}
                        alt={look.creatorHandle}
                        className="w-8 h-8 rounded-full object-cover border border-neutral-200"
                      />
                      <div>
                        <div className="font-bold text-black text-xs leading-none flex items-center gap-1">
                          <span>{look.creatorHandle}</span>
                        </div>
                        <span className="text-[10px] text-neutral-400 flex items-center gap-1 mt-0.5 font-mono">
                          <MapPin className="w-2.5 h-2.5" />
                          <span>{look.city || 'Bharat'}</span>
                        </span>
                      </div>
                    </div>

                    {/* Status Pill */}
                    <div>
                      {isCurated ? (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold border border-emerald-300 flex items-center gap-1">
                          <Check className="w-2.5 h-2.5" />
                          <span>CURATED</span>
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-mono font-bold border border-amber-300">
                          PENDING
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Photo Visual Preview */}
                  <div className="relative aspect-[4/5] bg-neutral-900 overflow-hidden">
                    <img
                      src={look.image}
                      alt={look.caption || look.creatorHandle}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Gradient Overlay for Monospace coordinates */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-3.5">
                      <p className="text-white text-xs font-medium line-clamp-2 drop-shadow-sm">
                        "{look.caption}"
                      </p>
                      <div className="flex items-center justify-between text-neutral-300 text-[10px] font-mono mt-2 pt-2 border-t border-white/20">
                        <span className="flex items-center gap-1">
                          <Heart className="w-3 h-3 text-red-400 fill-red-400" />
                          <span className="font-bold text-white">{(look.likes || 0).toLocaleString()}</span> likes
                        </span>
                        <span>{new Date(look.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Tagged Products Showcase */}
                  <div className="p-3.5 bg-[#fafaf9] border-t border-neutral-100 space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-mono font-semibold text-neutral-600 flex items-center gap-1">
                        <Tag className="w-3 h-3 text-neutral-400" />
                        <span>LINKED PRODUCTS ({tags.length})</span>
                      </span>
                      <button
                        onClick={() => handleOpenTagEditor(look)}
                        className="text-[10px] font-semibold text-black hover:underline underline-offset-2"
                      >
                        Edit Links
                      </button>
                    </div>

                    {/* Linked product chips */}
                    <div className="flex flex-wrap gap-1.5">
                      {tags.length > 0 ? (
                        tags.map(handle => (
                          <span
                            key={handle}
                            className="px-2 py-0.5 bg-white border border-neutral-200 text-neutral-800 rounded text-[10px] font-mono font-medium tracking-tight shadow-2xs"
                          >
                            #{handle}
                          </span>
                        ))
                      ) : (
                        <span className="text-[10px] text-neutral-400 font-mono italic">
                          No garments tagged yet
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Footer: Curation Control Actions */}
                  <div className="p-3 border-t border-neutral-100 flex items-center justify-between gap-2 bg-white">
                    <button
                      onClick={() => handleToggleCuration(look)}
                      className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                        isCurated
                          ? 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 border border-neutral-200'
                          : 'bg-black text-white hover:bg-neutral-800 shadow-xs'
                      }`}
                    >
                      {isCurated ? (
                        <>
                          <X className="w-3.5 h-3.5" />
                          <span>Uncurate Look</span>
                        </>
                      ) : (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Approve & Feature</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleBoostLikes(look, 100)}
                      title="Boost 100 Likes"
                      className="p-1.5 rounded-lg border border-neutral-200 hover:border-black text-neutral-600 hover:text-black transition-colors"
                    >
                      <Heart className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => handleDeleteLook(look.id)}
                      title="Delete Look"
                      className="p-1.5 rounded-lg border border-neutral-200 hover:border-red-500 text-neutral-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal: Link / Unlink Products */}
      {editingTagsId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-neutral-200 font-sans">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <h4 className="font-bold text-sm text-black">
                Link Garment Archive to {editingTagsId}
              </h4>
              <button onClick={() => setEditingTagsId(null)} className="text-neutral-400 hover:text-black">
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-neutral-500 my-3">
              Select all silhouettes that the creator is wearing in this lookbook submission.
            </p>

            <div className="space-y-2 max-h-60 overflow-y-auto py-1">
              {availableHandles.map(p => {
                const isSelected = selectedTags.includes(p.handle);
                return (
                  <label
                    key={p.handle}
                    onClick={() => {
                      if (isSelected) {
                        setSelectedTags(prev => prev.filter(t => t !== p.handle));
                      } else {
                        setSelectedTags(prev => [...prev, p.handle]);
                      }
                    }}
                    className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-black bg-neutral-50 font-semibold'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <span className="text-xs text-black">{p.title}</span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                      isSelected ? 'bg-black text-white' : 'bg-neutral-100 text-neutral-600'
                    }`}>
                      #{p.handle}
                    </span>
                  </label>
                );
              })}
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-neutral-100 mt-4">
              <button
                onClick={() => setEditingTagsId(null)}
                className="px-4 py-1.5 text-xs text-neutral-600 hover:text-black font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSaveTags(editingTagsId)}
                className="px-4 py-1.5 bg-black text-white rounded-xl text-xs font-semibold hover:bg-neutral-800"
              >
                Save Product Links
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add New Community Look */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <form
            onSubmit={handleCreateLook}
            className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-neutral-200 font-sans space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <h4 className="font-bold text-base text-black flex items-center gap-2">
                <Camera className="w-4 h-4" />
                <span>Publish Community Streetwear Look</span>
              </h4>
              <button type="button" onClick={() => setShowAddModal(false)} className="text-neutral-400 hover:text-black">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-[11px] font-medium text-neutral-700 block mb-1">
                  Creator Handle *
                </label>
                <input
                  type="text"
                  placeholder="@streetwear.archivist"
                  value={newHandle}
                  onChange={(e) => setNewHandle(e.target.value)}
                  required
                  className="w-full bg-[#f9f9f9] border border-neutral-200 rounded-xl px-3 py-2 focus:outline-none focus:border-black font-mono text-xs"
                />
              </div>

              <div>
                <label className="text-[11px] font-medium text-neutral-700 block mb-1">
                  Creator Real Name
                </label>
                <input
                  type="text"
                  placeholder="Aryan Sharma"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-[#f9f9f9] border border-neutral-200 rounded-xl px-3 py-2 focus:outline-none focus:border-black text-xs"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-medium text-neutral-700 block mb-1">
                Image URL (High Quality Editorial) *
              </label>
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
                required
                className="w-full bg-[#f9f9f9] border border-neutral-200 rounded-xl px-3 py-2 focus:outline-none focus:border-black text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-[11px] font-medium text-neutral-700 block mb-1">City / Region</label>
                <input
                  type="text"
                  placeholder="Mumbai, MH"
                  value={newCity}
                  onChange={(e) => setNewCity(e.target.value)}
                  className="w-full bg-[#f9f9f9] border border-neutral-200 rounded-xl px-3 py-2 text-xs"
                />
              </div>
              <div>
                <label className="text-[11px] font-medium text-neutral-700 block mb-1">Initial Likes</label>
                <input
                  type="number"
                  value={newLikes}
                  onChange={(e) => setNewLikes(e.target.value)}
                  className="w-full bg-[#f9f9f9] border border-neutral-200 rounded-xl px-3 py-2 text-xs font-mono"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-medium text-neutral-700 block mb-1">Styling Notes / Caption</label>
              <textarea
                rows={2}
                placeholder="Describe how the silhouette was styled..."
                value={newCaption}
                onChange={(e) => setNewCaption(e.target.value)}
                className="w-full bg-[#f9f9f9] border border-neutral-200 rounded-xl p-2.5 text-xs focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="text-[11px] font-medium text-neutral-700 block mb-1">Tag Garments</label>
              <div className="flex flex-wrap gap-1.5 p-2 bg-[#f9f9f9] rounded-xl border border-neutral-200">
                {availableHandles.map(p => {
                  const checked = newTaggedProducts.includes(p.handle);
                  return (
                    <button
                      type="button"
                      key={p.handle}
                      onClick={() => {
                        if (checked) {
                          setNewTaggedProducts(prev => prev.filter(h => h !== p.handle));
                        } else {
                          setNewTaggedProducts(prev => [...prev, p.handle]);
                        }
                      }}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition-colors ${
                        checked ? 'bg-black text-white' : 'bg-white border border-neutral-200 text-neutral-700'
                      }`}
                    >
                      #{p.handle}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="directCurate"
                checked={newCurated}
                onChange={(e) => setNewCurated(e.target.checked)}
                className="w-4 h-4 rounded border-neutral-300 accent-black"
              />
              <label htmlFor="directCurate" className="text-xs font-medium text-neutral-800">
                Instantly Curate and Publish Live to Storefront Lookbook
              </label>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-neutral-100">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-xs text-neutral-600 hover:text-black font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-black text-white rounded-xl text-xs font-semibold hover:bg-neutral-800 transition-colors shadow-xs"
              >
                Publish Street Look
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}

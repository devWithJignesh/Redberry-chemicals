import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Search, X } from 'lucide-react';

/**
 * Enterprise Custom Designed Select Component
 * @param {Object} props
 * @param {string} props.id - HTML ID
 * @param {string} props.name - Form field name
 * @param {string|number} props.value - Selected value
 * @param {Function} props.onChange - Change handler (passes either event or value)
 * @param {Array<{value: string|number, label: string, icon?: any, badge?: string, sub?: string}>} props.options
 * @param {string} [props.placeholder] - Placeholder text
 * @param {boolean} [props.error] - If error state
 * @param {boolean} [props.disabled] - If disabled
 * @param {boolean} [props.searchable] - Enable search filter inside dropdown
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.ReactNode} [props.prefixIcon] - Left icon inside trigger
 */
export default function AdminSelect({
  id,
  name,
  value,
  onChange,
  options = [],
  placeholder = 'Select an option...',
  error = false,
  disabled = false,
  searchable = false,
  className = '',
  prefixIcon = null,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when opened
  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
  }, [isOpen, searchable]);

  // Handle escape key
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        setSearchQuery('');
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Find currently selected option object
  const selectedOption = options.find((opt) => String(opt.value) === String(value));

  const handleSelect = (optionValue) => {
    if (disabled) return;
    setIsOpen(false);
    setSearchQuery('');

    if (onChange) {
      // Provide both synthetic event and raw value compatibility
      const syntheticEvent = {
        target: {
          name: name || id,
          value: optionValue,
        },
      };
      onChange(syntheticEvent, optionValue);
    }
  };

  // Filter options if searchable
  const filteredOptions = searchable && searchQuery.trim()
    ? options.filter((opt) =>
        opt.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (opt.sub && opt.sub.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : options;

  return (
    <div
      ref={dropdownRef}
      className={`admin-custom-select-container ${isOpen ? 'open' : ''} ${disabled ? 'disabled' : ''} ${error ? 'has-error' : ''} ${className}`}
    >
      {/* Trigger Button */}
      <button
        type="button"
        id={id}
        name={name}
        className={`admin-custom-select-trigger ${selectedOption ? 'selected' : 'placeholder'}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="admin-custom-select-trigger-content">
          {prefixIcon && <span className="admin-custom-select-prefix-icon">{prefixIcon}</span>}
          {selectedOption ? (
            <div className="admin-custom-select-selected-item">
              {selectedOption.icon && (
                <span className="admin-custom-select-item-icon">{selectedOption.icon}</span>
              )}
              <span className="admin-custom-select-label">{selectedOption.label}</span>
              {selectedOption.badge && (
                <span className="admin-custom-select-badge">{selectedOption.badge}</span>
              )}
            </div>
          ) : (
            <span className="admin-custom-select-placeholder">{placeholder}</span>
          )}
        </div>

        <ChevronDown
          size={16}
          className={`admin-custom-select-arrow ${isOpen ? 'rotate' : ''}`}
        />
      </button>

      {/* Dropdown Menu Popup */}
      {isOpen && (
        <div className="admin-custom-select-menu" role="listbox">
          {/* Optional Search Bar */}
          {searchable && (
            <div className="admin-custom-select-search-wrap">
              <Search size={14} className="admin-custom-select-search-icon" />
              <input
                ref={searchInputRef}
                type="text"
                className="admin-custom-select-search-input"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="btn-clear-select-search"
                  onClick={() => setSearchQuery('')}
                >
                  <X size={12} />
                </button>
              )}
            </div>
          )}

          {/* Options List */}
          <div className="admin-custom-select-options-list">
            {filteredOptions.length === 0 ? (
              <div className="admin-custom-select-empty">No matching options</div>
            ) : (
              filteredOptions.map((opt) => {
                const isSelected = String(opt.value) === String(value);
                return (
                  <div
                    key={String(opt.value)}
                    className={`admin-custom-select-option ${isSelected ? 'active' : ''}`}
                    onClick={() => handleSelect(opt.value)}
                    role="option"
                    aria-selected={isSelected}
                  >
                    <div className="admin-custom-select-option-info">
                      <div className="admin-custom-select-option-main">
                        {opt.icon && (
                          <span className="admin-custom-select-option-icon">{opt.icon}</span>
                        )}
                        <span className="admin-custom-select-option-label">{opt.label}</span>
                        {opt.badge && (
                          <span className="admin-custom-select-badge">{opt.badge}</span>
                        )}
                      </div>
                      {opt.sub && (
                        <span className="admin-custom-select-option-sub">{opt.sub}</span>
                      )}
                    </div>

                    {isSelected && (
                      <Check size={15} className="admin-custom-select-check-icon" />
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

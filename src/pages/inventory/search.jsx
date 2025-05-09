import React, { useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PropTypes from "prop-types";

export function InventorySearch({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const clearSearch = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <form onSubmit={handleSearch} className='relative w-full md:w-auto'>
      <div className='relative'>
        <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
        <Input
          type='search'
          placeholder='Search inventory...'
          className='w-full md:w-[300px] pl-10 pr-10'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <div className='absolute right-3 top-1/2 -translate-y-1/2'>
            <Button
              type='button'
              variant='ghost'
              size='icon'
              className='h-5 w-5 rounded-full'
              onClick={clearSearch}>
              <X className='h-3 w-3' />
            </Button>
          </div>
        )}
      </div>
    </form>
  );
}

InventorySearch.proptypes = {
  onSearch: PropTypes.func,
};

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const searchSchema = z.object({
  search: z
    .string()
    .trim()
    .refine((value) => value.length === 0 || value.length >= 2, {
      message: "Use at least 2 characters or clear the field.",
    }),
});

type SearchFormData = z.infer<typeof searchSchema>;

interface Props {
  value: string;
  onSearch: (value: string) => void;
}

function SearchInput({ value, onSearch }: Props) {
  const [searchValue, setSearchValue] = useState(value);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: value,
    },
  });

  const registeredSearch = register("search");

  useEffect(() => {
    setSearchValue(value);
    reset({ search: value });
  }, [reset, value]);

  const onSubmit = handleSubmit(({ search }) => {
    onSearch(search.trim());
  });

  return (
    <form className="search-form" onSubmit={onSubmit} noValidate>
      <div className="search-form__row">
        <span className="search-form__icon" aria-hidden="true">
          Q
        </span>
        <input
          {...registeredSearch}
          ref={(element) => {
            registeredSearch.ref(element);
            inputRef.current = element;
          }}
          type="search"
          className="search-form__input"
          placeholder="Search games..."
          value={searchValue}
          onChange={(event) => {
            registeredSearch.onChange(event);
            setSearchValue(event.target.value);
            setValue("search", event.target.value, {
              shouldDirty: true,
              shouldValidate: true,
            });
          }}
        />

        {searchValue ? (
          <button
            type="button"
            className="search-form__clear"
            onClick={() => {
              setSearchValue("");
              reset({ search: "" });
              onSearch("");
              inputRef.current?.focus();
            }}
          >
            Clear
          </button>
        ) : null}

        <button type="submit" className="search-form__button" aria-label="Search games">
          Go
        </button>
      </div>

      {errors.search ? <span className="search-form__error">{errors.search.message}</span> : null}
    </form>
  );
}

export default SearchInput;

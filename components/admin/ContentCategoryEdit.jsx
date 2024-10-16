import { useEffect } from "react";
import { useState, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useRecoilState } from "recoil";
import { contentCatEdit } from "../../atoms/contentCategoryEdit";

const ContentCategoryEdit = ({ categories }) => {
  const [selectedContentCat, setSelectedContentCat] = useRecoilState(
    contentCatEdit
  );
  const [contentCategories, setContentCategories] = useState([]);

  useEffect(() => {
    setContentCategories(categories);

    console.log("SELECTEDDDD", selectedContentCat);
  }, [categories, selectedContentCat]);

  return (
    <div className="w-1/3 mt-4 text-black mx-auto">
      <h1
        className="block text-white text-center text-2xl font-bold mb-4 pr-4"
        htmlFor="inline-full-name"
      >
        Content Category
      </h1>
      <Listbox
        as="div"
        value={selectedContentCat}
        onChange={setSelectedContentCat}
      >
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{selectedContentCat.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="z-10 overflow-y-auto mt-1 max-h-60 w-full rounded-md bg-white py-1 text-black shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {contentCategories?.map((category, categoryIdx) => (
                <Listbox.Option
                  key={categoryIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                    }`
                  }
                  value={category}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {category.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default ContentCategoryEdit;

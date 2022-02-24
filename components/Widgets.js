import { SearchIcon } from "@heroicons/react/outline";
import { DotsHorizontalIcon, VideoCameraIcon } from "@heroicons/react/solid";
import Contact from "./Contact";

const contacts = [
  { src: "https://links.papareact.com/f0p", name: "Jeff Bezos" },
  { src: "https://links.papareact.com/kxk", name: "Elon Musk" },
  { src: "https://links.papareact.com/zvy", name: "Bill Gates" },
  { src: "https://links.papareact.com/snf", name: "Mark Zuckerberg" },
  { src: "https://links.papareact.com/d0c", name: "Harry Potter" },
  { src: "https://links.papareact.com/6gg", name: "The Queen" },
];

function Widgets() {
  return (
    <div>
      <div className="mt-5 hidden w-60 flex-col p-2 lg:inline-flex">
        <div className="mb-5 flex items-center justify-between text-gray-500">
          <h2 className="text-xl">Contacts</h2>
          <div className="flex space-x-2">
            <VideoCameraIcon className="h-6" />
            <SearchIcon className="h-6" />
            <DotsHorizontalIcon className="h-6" />
          </div>
        </div>

        {contacts.map((contact) => (
          <Contact key={contact.src} src={contact.src} name={contact.name} />
        ))}
      </div>
    </div>
  );
}

export default Widgets;

"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import AddContactForm from "@/components/contact/addContact";
import { Contact } from "@prisma/client";

async function fetchContacts() {
  const response = await fetch("/api/search-address/db/get");
  if (!response.ok) {
    throw new Error(await response.text());
  }
  return response.json();
}

async function saveContact(contact: any) {
  const response = await fetch("/api/db/save", {
    method: "POST",
    body: JSON.stringify(contact),
    headers: {
      "content-type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}

export default function Index() {
  const [contacts, setContacts] = useState<Contact[]>([]);


  useEffect(() => {
    async function fetchData() {
      try {
        const initialContacts = await fetchContacts();
        console.log("initialContacts", initialContacts);
        setContacts(initialContacts.contact);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <div className="flex bg-blue-500">
        <section className="w-1/3 bg-gray-800 h-screen p-8">
          <div className="mb-3">
            <h2 className="text-3xl text-white">Add a data</h2>
          </div>
          <AddContactForm
            onSubmit={async (data: any, e: any) => {
              try {
                await saveContact(data);
                setContacts([...(contacts ?? []), data]);
                e.target.reset();
              } catch (err) {
                console.log(err);
              }
            }}
          />
        </section>
        <section className="w-2/3 h-screen p-8">
          <div className="mb-3">
            <h2 className="text-3xl text-gray-700">Contacts</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {contacts.map((c: Contact, i: number) => (
              <div
                className="bg-white rounded-lg border border-gray-200 shadow-md p-6 m-2"
                key={i}
              >
                <img
                  className="h-16 w-16 rounded-full mx-auto mb-4"
                  src={c.avatar}
                  alt={`Avatar of ${c.firstName}`}
                />
                <h2 className="text-lg text-gray-900 font-bold text-center">
                  {c.firstName} {c.lastName}
                </h2>
                <p className="text-gray-700 text-center mb-3">{c.email}</p>
                {/* Other details can be added here */}
                <div className="text-center">
                  <a href="#" className="text-blue-500 hover:underline">
                    View Profile
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

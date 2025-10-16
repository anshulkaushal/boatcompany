import { prisma } from "@/lib/prisma";

export default async function Home() {
  const boats = await prisma.boat.findMany({ orderBy: { name: "asc" } });

  return (
    <div className="container mx-auto p-6 space-y-8" suppressHydrationWarning>
      <div>
        <h1 className="text-3xl font-bold">Boat Hire</h1>
        <p className="text-gray-600">Browse boats and send an enquiry.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {boats.map((boat) => (
          <div key={boat.id} className="rounded border p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">{boat.name}</h2>
              {boat.capacity ? (
                <span className="text-sm text-gray-500">{boat.capacity} pax</span>
              ) : null}
            </div>
            {boat.type ? <p className="text-sm text-gray-600">{boat.type}</p> : null}
            {boat.description ? (
              <p className="text-sm text-gray-700">{boat.description}</p>
            ) : null}

            <EnquiryForm boatId={boat.id} />
          </div>
        ))}
      </div>
    </div>
  );
}

function EnquiryForm({ boatId }: { boatId: number }) {
  async function submit(formData: FormData) {
    'use server';
    const name = String(formData.get('name') || '');
    const email = String(formData.get('email') || '');
    const phone = String(formData.get('phone') || '');
    const message = String(formData.get('message') || '');
    const startTime = String(formData.get('startTime') || '');
    const endTime = String(formData.get('endTime') || '');

    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ''}/api/enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, message, boatId, startTime, endTime }),
      cache: 'no-store',
    });
  }

  return (
    <form action={submit} className="space-y-2 mt-2">
      <input name="name" placeholder="Your name" className="w-full border p-2 rounded" required />
      <input name="email" placeholder="Email" type="email" className="w-full border p-2 rounded" required />
      <input name="phone" placeholder="Phone" className="w-full border p-2 rounded" />
      <div className="grid grid-cols-2 gap-2">
        <input name="startTime" type="datetime-local" className="border p-2 rounded" required />
        <input name="endTime" type="datetime-local" className="border p-2 rounded" required />
      </div>
      <textarea name="message" placeholder="Message" className="w-full border p-2 rounded" />
      <button type="submit" className="bg-black text-white px-4 py-2 rounded">Send enquiry</button>
    </form>
  );
}

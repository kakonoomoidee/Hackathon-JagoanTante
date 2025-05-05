// app/api/contract/route.ts
import { NextResponse } from "next/server";
import { backend } from "../../../../../declarations/backend";
import { Principal } from "@dfinity/principal";

console.log('Imported backend:', backend); 

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, description, participants, fileData, createdAt } = body;

    console.log('backend:', backend);
    console.log('backend.createContract:', backend.createContract);

    const principalArray = participants.map((id: string) =>
      Principal.fromText(id)
    );
    const fileBuffer = Uint8Array.from(fileData); // fileData should be an array of numbers

    const contractId = await backend.createContract(
      name,
      description,
      principalArray,
      fileBuffer,
      BigInt(createdAt)
    );

    return NextResponse.json({ contractId }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || String(err) },
      { status: 500 }
    );
  }
}

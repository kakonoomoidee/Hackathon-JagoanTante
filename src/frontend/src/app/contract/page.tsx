"use client";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import Footer from "@/components/footer";

export default function ContractPage() {
  const [participants, setParticipants] = useState<string[]>([""]);
  const [fileName, setFileName] = useState("");
  const [contractName, setContractName] = useState("");
  const [contractDescription, setContractDescription] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [fileError, setFileError] = useState("");

  const handleAddParticipant = () => setParticipants([...participants, ""]);

  const handleChangeParticipant = (index: number, value: string) => {
    const updated = [...participants];
    updated[index] = value;
    setParticipants(updated);
  };

  const handleFileChange = (file: File) => {
    // Check if the file is a PDF
    if (file.type !== "application/pdf") {
      setFileError("Only PDF files are allowed.");
      return;
    }

    // Check if the file size is greater than 1MB
    if (file.size > 1048576) {
      setFileError("PDF file size cannot exceed 1MB.");
      return;
    }

    // Reset error if it's a valid PDF
    setFileError("");
    setFileName(file.name);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles[0]) {
        handleFileChange(acceptedFiles[0]);
      }
    },
    accept: { "application/pdf": [".pdf"] },
    maxSize: 1048576, // 1MB size limit
  });

  const handleContractNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 255) {
      setContractName(e.target.value);
    }
  };

  const handleContractDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (e.target.value.length <= 1000) {
      setContractDescription(e.target.value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Reset previous errors
    setErrors({});
    setFileError("");

    // Validation logic
    const newErrors: { [key: string]: string } = {};

    // Contract Name Validation
    if (!contractName) {
      newErrors.contractName = "Contract name is required.";
    } else if (contractName.length > 255) {
      newErrors.contractName = "Contract name cannot exceed 255 characters.";
    }

    // Contract Description Validation
    if (!contractDescription) {
      newErrors.contractDescription = "Contract description is required.";
    } else if (contractDescription.length > 1000) {
      newErrors.contractDescription =
        "Contract description cannot exceed 1000 characters.";
    }

    // File Validation
    if (!fileName) {
      newErrors.file = "PDF file is required."; // New validation for missing file
    } else if (fileError) {
      newErrors.file = fileError; // Add file error if it exists
    }

    // Participants Validation
    if (participants.some((id) => !id)) {
      newErrors.participants = "All participant IDs must be filled.";
    }

    // If there are errors, set the state to show them
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      // Proceed with form submission logic (e.g., upload to Web3 storage)
      console.log("Form submitted!");

      // Reset form fields after successful submission
      setContractName("");
      setContractDescription("");
      setFileName("");
      setParticipants([""]);
      setErrors({});
      setFileError(""); // Reset file error state
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#00ffe055_1px,transparent_1px)] [background-size:24px_24px] z-0" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#020409] to-[#0f172a] opacity-80 z-0" />

      {/* Header */}
      <header className="relative z-10 w-full px-8 py-4 flex justify-between items-center border-b border-gray-800">
        <div className="flex items-center gap-2">
          <img src="/acta_logo.png" alt="ACTA Logo" className="h-8 w-auto" />
        </div>
      </header>

      {/* Form Card */}
      <section className="relative z-10 px-6 py-10 flex justify-center items-center grow">
        <div className="bg-white/10 border border-white/20 backdrop-blur-[10px] bg-opacity-20 rounded-2xl p-6 max-w-3xl w-full shadow-lg space-y-6">
          <h2 className="text-2xl font-bold text-white">Create New Contract</h2>

          <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
            {/* Contract Form Section */}
            <div className="space-y-4">
              {/* Contract Name */}
              <div>
                <input
                  type="text"
                  placeholder="Contract Name"
                  value={contractName}
                  onChange={handleContractNameChange}
                  className="w-full bg-black/20 border border-white/20 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
                {errors.contractName && (
                  <p className="text-xs text-red-400 mt-1">
                    {errors.contractName}
                  </p>
                )}
              </div>

              {/* Contract Description */}
              <div>
                <textarea
                  placeholder="Contract Description"
                  value={contractDescription}
                  onChange={handleContractDescriptionChange}
                  className="w-full bg-black/20 border border-white/20 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 resize-none overflow-auto scrollbar-hidden"
                  rows={4}
                />
                {errors.contractDescription && (
                  <p className="text-xs text-red-400 mt-1">
                    {errors.contractDescription}
                  </p>
                )}
              </div>

              {/* Participants */}
              <div className="space-y-2">
                <label className="text-sm">Participant Principal IDs</label>
                {participants.map((value, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      value={value}
                      onChange={(e) =>
                        handleChangeParticipant(i, e.target.value)
                      }
                      placeholder={`Principal ID #${i + 1}`}
                      className="w-full bg-black/20 border border-white/20 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                  </div>
                ))}
                {errors.participants && (
                  <p className="text-xs text-red-400 mt-1">
                    {errors.participants}
                  </p>
                )}
                <button
                  onClick={handleAddParticipant}
                  type="button"
                  className="text-cyan-400 hover:underline text-sm"
                >
                  + Add Another Participant
                </button>
              </div>
            </div>

            {/* Upload PDF Section */}
            <div
              className="w-full p-6 border border-white/20 rounded-md flex flex-col items-center justify-center bg-black/20 mt-4 min-h-[180px]"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <p className="text-white text-sm">
                Drag & drop a PDF here, or click to select a file
              </p>
              {fileName && (
                <p className="text-xs text-green-400 mt-1">
                  Uploaded: {fileName}
                </p>
              )}
              {fileError && (
                <p className="text-xs text-red-400 mt-1">{fileError}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-md w-full transition"
              >
                Create Contract
              </button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}

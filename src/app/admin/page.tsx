"use client";

import { useState } from "react";
import axios from "axios";
import Link from "next/link";

const api = process.env.NEXT_PUBLIC_API_URL;

export default function AdminPage() {
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [sessionName, setSessionName] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [quota, setQuota] = useState(0);

  const createStudent = async () => {
    try {
      await axios.post(`${api}/students`, {
        name: studentName,
        email: studentEmail,
      });
      alert("Student created!");
      setStudentName("");
      setStudentEmail("");
    } catch (err: any) {
      alert(err.response?.data?.error || "Failed to create student");
    }
  };

  const createSession = async () => {
    try {
      await axios.post(`${api}/sessions`, {
        name: sessionName,
        startAt: new Date(startDateTime),
        endAt: new Date(endDateTime),
        quota: Number(quota),
      });
      alert("Session created!");
      setSessionName("");
      setStartDateTime("");
      setEndDateTime("");
      setQuota(0);
    } catch (err: any) {
      alert(err.response?.data?.error || "Failed to create session");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="absolute top-6 right-6">
        <Link href="/">
          <button className="inline-flex items-center gap-2 bg-gray-200 text-gray-800 text-sm px-4 py-1.5 rounded-md hover:bg-gray-300 transition shadow">
            🏠 Inicio
          </button>
        </Link>
      </div>

      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">
          👩‍🎓 Create Student
        </h2>
        <div className="space-y-4">
          <input
            className="w-full border rounded px-3 py-2"
            type="text"
            placeholder="Name"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          />
          <input
            className="w-full border rounded px-3 py-2"
            type="email"
            placeholder="Email"
            value={studentEmail}
            onChange={(e) => setStudentEmail(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={createStudent}
          >
            Create Student
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
        <h2 className="text-2xl font-bold text-green-600 mb-4">
          📚 Create Session
        </h2>
        <div className="space-y-4">
          <input
            className="w-full border rounded px-3 py-2"
            type="text"
            placeholder="Session Name"
            value={sessionName}
            onChange={(e) => setSessionName(e.target.value)}
          />
          <input
            className="w-full border rounded px-3 py-2"
            type="datetime-local"
            value={startDateTime}
            onChange={(e) => setStartDateTime(e.target.value)}
          />
          <input
            className="w-full border rounded px-3 py-2"
            type="datetime-local"
            value={endDateTime}
            onChange={(e) => setEndDateTime(e.target.value)}
          />
          <input
            className="w-full border rounded px-3 py-2"
            type="number"
            placeholder="Quota"
            value={quota}
            onChange={(e) => setQuota(Number(e.target.value))}
          />
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={createSession}
          >
            Create Session
          </button>
        </div>
      </div>
    </div>
  );
}

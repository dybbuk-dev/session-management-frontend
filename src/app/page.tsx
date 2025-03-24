"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const api = process.env.NEXT_PUBLIC_API_URL;

type Session = {
  _id: string;
  name: string;
  startAt: string;
  endAt: string;
  quota: number;
};

type Student = {
  _id: string;
  name: string;
};

export default function Home() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [assignmentError, setAssignmentError] = useState("");

  useEffect(() => {
    axios.get(`${api}/sessions`).then((res) => setSessions(res.data));
    axios.get(`${api}/students`).then((res) => setStudents(res.data));
  }, []);

  const dates = [
    ...new Set(sessions.map((s) => format(new Date(s.startAt), "yyyy-MM-dd"))),
  ].sort();

  const sessionsForDate = sessions.filter(
    (s) => format(new Date(s.startAt), "yyyy-MM-dd") === selectedDate
  );

  const assign = async () => {
    setAssignmentError("");
    if (!selectedSession || !selectedStudent) return;
    try {
      await axios.post(`${api}/assignments`, {
        student: selectedStudent,
        session: selectedSession._id,
      });
      alert("Estudiante asignado correctamente");
      setSelectedStudent("");
    } catch (error: any) {
      const resData = error?.response?.data;
      const msg =
        typeof resData === "string"
          ? resData
          : resData?.message ||
            resData?.error ||
            "No se pudo asignar al estudiante";
      setAssignmentError(msg);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto text-blue-900">
      <div className="absolute top-6 right-6">
        <Link href="/admin">
          <button className="inline-flex items-center gap-2 bg-blue-600 text-white text-sm px-4 py-1.5 rounded-md hover:bg-blue-700 transition shadow">
            ⚙️ Admin
          </button>
        </Link>
      </div>
      <h2 className="text-xl font-bold mb-2">Calendario :</h2>
      <div className="flex gap-4 mb-6">
        {dates.map((date) => (
          <button
            key={date}
            onClick={() => setSelectedDate(date)}
            className={`rounded-lg px-4 py-2 border-2 ${
              selectedDate === date
                ? "bg-blue-100 border-blue-500"
                : "border-blue-200"
            }`}
          >
            <div className="font-semibold">
              {format(new Date(date), "EEEE", { locale: es })}
            </div>
            <div className="text-lg">{format(new Date(date), "d")}</div>
            <div>{format(new Date(date), "MMMM", { locale: es })}</div>
          </button>
        ))}
      </div>

      {selectedDate && (
        <>
          <h3 className="text-xl font-bold mb-2">Sesiones disponibles :</h3>
          <div className="flex gap-4 flex-wrap mb-6">
            {sessionsForDate.map((s) => (
              <button
                key={s._id}
                onClick={() => setSelectedSession(s)}
                className={`rounded-lg border-2 px-4 py-3 text-left w-48 hover:bg-blue-50 ${
                  selectedSession?._id === s._id
                    ? "border-blue-500"
                    : "border-blue-200"
                }`}
              >
                <div className="font-bold uppercase">{s.name}</div>
                <div>
                  {format(new Date(s.startAt), "HH:mm")} a{" "}
                  {format(new Date(s.endAt), "HH:mm")}
                </div>
                <div>Cupo: {s.quota}</div>
              </button>
            ))}
          </div>
        </>
      )}

      {selectedSession && (
        <div className="border rounded-xl p-6 shadow bg-white">
          <h4 className="text-lg font-bold mb-4">
            Curso: {selectedSession.name}
          </h4>
          <p>
            <strong>Fecha inicio:</strong>{" "}
            {format(new Date(selectedSession.startAt), "EEEE d MMMM", {
              locale: es,
            })}
          </p>
          <p>
            <strong>Horario:</strong>{" "}
            {format(new Date(selectedSession.startAt), "HH:mm")} a{" "}
            {format(new Date(selectedSession.endAt), "HH:mm")}
          </p>
          <p>
            <strong>Cupo disponible:</strong> {selectedSession.quota}
          </p>

          <div className="mt-4">
            <label className="block mb-1 font-medium">
              Asignar Estudiante:
            </label>
            <select
              className="border rounded px-3 py-2 w-full"
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
            >
              <option value="">Seleccione un estudiante</option>
              {students.map((stu) => (
                <option key={stu._id} value={stu._id}>
                  {stu.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={assign}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Asignar
          </button>
          {assignmentError && (
            <p className="mt-2 text-sm text-red-600">{assignmentError}</p>
          )}
        </div>
      )}
    </div>
  );
}

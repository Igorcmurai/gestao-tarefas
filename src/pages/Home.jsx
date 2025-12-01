import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getTasks, removeTask, getUser } from "../services/tasksService";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("Todos status");
  const [search, setSearch] = useState("");
  const nav = useNavigate();

  function load() {
    const list = getTasks() || [];
    setTasks(list);
  }

  useEffect(() => {
    load();
    const user = getUser();
    if (!user) nav("/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleDelete(id) {
    if (!confirm("Confirma excluir essa tarefa?")) return;
    removeTask(id);
    load();
  }

  function filtered() {
    return tasks.filter((t) => {
      if (statusFilter !== "Todos status" && t.status !== statusFilter) {
        return false;
      }
      const q = search.trim().toLowerCase();
      if (!q) return true;
      return (
        (t.title || "").toLowerCase().includes(q) ||
        (t.responsible || "").toLowerCase().includes(q)
      );
    });
  }

  function formatDates(t) {
    const created = t.createdAt ? new Date(t.createdAt).toLocaleDateString() : "-";
    const concluded = t.concludedAt ? new Date(t.concludedAt).toLocaleDateString() : null;
    return concluded ? `${created} • ${concluded}` : created;
  }

  // estilo inline para o botão delete (vermelho escuro)
  const deleteBtnStyle = {
    background: "#6f1d1d",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: 6,
    cursor: "pointer",
    boxShadow: "0 4px 8px rgba(0,0,0,0.15)"
  };

  return (
    <div style={{ padding: 28 }}>
      <div style={{ display: "flex", gap: 12, alignItems: "center", maxWidth: 1100, margin: "0 auto 18px" }}>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ padding: "10px 12px", borderRadius: 6, flex: "0 0 220px" }}
        >
          <option>Todos status</option>
          <option>Pendente</option>
          <option>Em andamento</option>
          <option>Finalizado</option>
        </select>

        <input
          placeholder="Buscar por título ou responsável"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "10px 12px", borderRadius: 6, flex: 1 }}
        />

        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <button
            onClick={() => { setStatusFilter("Todos status"); setSearch(""); }}
            className="btn ghost"
            type="button"
          >
            Limpar Filtro
          </button>

          <button
            onClick={() => nav("/create")}
            className="btn primary"
            type="button"
          >
            Criar Tarefa
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ textAlign: "left", color: "#374151" }}>
              <th style={{ padding: "12px 16px", width: 60 }}>ID</th>
              <th style={{ padding: "12px 16px" }}>Título</th>
              <th style={{ padding: "12px 16px", width: 180 }}>Responsável</th>
              <th style={{ padding: "12px 16px", width: 150 }}>Status</th>
              <th style={{ padding: "12px 16px", width: 200 }}>Datas</th>
              <th style={{ padding: "12px 16px", width: 160 }}>Ações</th>
            </tr>
          </thead>

          <tbody>
            {filtered().map((t) => (
              <tr key={t.id} style={{ background: "#fff", borderRadius: 8, marginBottom: 12 }}>
                <td style={{ padding: "18px 16px", verticalAlign: "top" }}>{t.id}</td>

                {/* Apenas o título com link para detalhes — sem descrição na lista */}
                <td style={{ padding: "18px 16px", verticalAlign: "top" }}>
                  <div>
                    <Link to={`/details/${t.id}`} style={{ color: "#1b4ed8", textDecoration: "underline" }}>
                      {t.title}
                    </Link>
                  </div>
                </td>

                <td style={{ padding: "18px 16px", verticalAlign: "top" }}>{t.responsible}</td>
                <td style={{ padding: "18px 16px", verticalAlign: "top" }}>{t.status}</td>
                <td style={{ padding: "18px 16px", verticalAlign: "top" }}>{formatDates(t)}</td>

                <td style={{ padding: "18px 16px", verticalAlign: "top" }}>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      onClick={() => nav(`/edit/${t.id}`)}
                      className="btn ghost"
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => handleDelete(t.id)}
                      style={deleteBtnStyle}
                      title="Deletar tarefa"
                    >
                      Deletar
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filtered().length === 0 && (
              <tr>
                <td colSpan={6} style={{ padding: 30, textAlign: "center", color: "#6b7280" }}>
                  Nenhuma tarefa encontrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

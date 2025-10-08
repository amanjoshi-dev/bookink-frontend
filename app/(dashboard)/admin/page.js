'use client';
/**
 * Admin frontpage with date controls + traffic chart (Playbook vibe)
 */
import { RequireRole } from '@/lib/guard';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import LineChart from '@/components/charts/LineChart';

export default function AdminHome() {
  const [range, setRange] = useState('month'); // 'month' | 'week' | 'year'
  const now = new Date();

  // Fake series for the UI; replace with real API later.
  const { labels, series } = useMemo(() => {
    if (range === 'week') {
      return { labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], series: [10,12,9,14,18,7,6] };
    }
    if (range === 'year') {
      return { labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'], series: [50,40,42,60,58,63,70,66,61,64,72,75] };
    }
    // month (30-ish)
    const days = Array.from({ length: 30 }, (_, i) => i + 1);
    return { labels: days.map(d => d.toString()), series: days.map(() => Math.floor(20 + Math.random() * 15)) };
  }, [range]);

  const prettyDate = now.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <RequireRole role="admin">
      <div className="container-fluid py-3">
        {/* Header & date controls */}
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
          <h4 className="mb-2 mb-md-0">Dashboard</h4>

          <div className="d-flex align-items-center gap-2">
            <div className="text-secondary small me-2">{prettyDate}</div>
            <div className="btn-group btn-group-sm" role="group" aria-label="Date range">
              <button className={`btn btn-outline-light ${range==='week'?'active':''}`} onClick={()=>setRange('week')}>Week</button>
              <button className={`btn btn-outline-light ${range==='month'?'active':''}`} onClick={()=>setRange('month')}>Month</button>
              <button className={`btn btn-outline-light ${range==='year'?'active':''}`} onClick={()=>setRange('year')}>Year</button>
            </div>
          </div>
        </div>

        {/* KPI cards */}
        <div className="row g-3 mb-3">
          {[
            { title: 'Total Customers', value: 0, tone: 'primary' },
            { title: 'Total Agencies', value: 0, tone: 'secondary' },
            { title: 'Scheduled Posts', value: 0, tone: 'info' },
            { title: 'Live Posts', value: 0, tone: 'success' },
          ].map((kpi, i) => (
            <div className="col-12 col-sm-6 col-lg-3" key={i}>
              <div className="card bg-dark h-100">
                <div className="card-body">
                  <div className="text-secondary small">{kpi.title}</div>
                  <div className={`display-6 fw-semibold text-${kpi.tone}`}>{kpi.value}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Chart + quick modules */}
        <div className="row g-3">
          <div className="col-lg-8">
            <div className="card bg-dark h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div className="fw-semibold">Posts–Customers Traffic</div>
                  <span className="badge text-bg-secondary text-uppercase">{range}</span>
                </div>
                <LineChart labels={labels} series={series} />
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            {/* Quick action cards (reuse your links) */}
            <div className="card bg-dark mb-3">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="fw-semibold">Taxonomies</div>
                    <div className="text-secondary small">Manage Styles, Languages, Inks, Placements</div>
                  </div>
                  <Link href="/admin/taxonomies" className="btn btn-success btn-sm">Open</Link>
                </div>
              </div>
            </div>

            <div className="card bg-dark mb-3">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <div className="fw-semibold">Agencies</div>
                  <div className="text-secondary small">Review & manage agencies</div>
                </div>
                <Link href="/admin/agencies" className="btn btn-outline-light btn-sm">Open</Link>
              </div>
            </div>

            <div className="card bg-dark">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <div className="fw-semibold">Forum</div>
                  <div className="text-secondary small">Moderate posts & comments</div>
                </div>
                <Link href="/admin/forum" className="btn btn-outline-light btn-sm">Open</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RequireRole>
  );
}

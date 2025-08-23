import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    username?: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    roles?: Role[];
    companies?: Company[];
    students?: Student[];
    [key: string]: unknown; // This allows for additional properties...
}

export interface CompanyImage {
    id: number;
    company_id: number;
    image_path: string;
    title?: string;
    description?: string;
    type?: string;
    order: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    image_url?: string;
    type_label?: string;
}

export interface Company {
    id: number;
    name: string;
    nit: string;
    responsible_name: string;
    responsible_email: string;
    responsible_phone: string;
    responsible_position: string;
    address: string;
    logo?: string;
    logo_url?: string;
    user_id: number;
    created_at: string;
    updated_at: string;
    images?: CompanyImage[];
    [key: string]: unknown;
}

export interface Category {
    id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
    forms_count?: number;
    challenges_count?: number;
    forms?: Form[];
    challenges?: Challenge[];
}

export interface Form {
    id: number;
    name: string;
    description: string;
    questions: FormQuestion[];
    category_id: number;
    created_at: string;
    updated_at: string;
    category?: Category;
    answers_count?: number;
    answers?: Answer[];
}

export interface FormQuestion {
    text: string;
    type: 'text' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'number' | 'email';
    required: boolean;
    options?: string[];
}

export interface Challenge {
    id: number;
    name: string;
    description: string;
    objective: string;
    difficulty: 'easy' | 'medium' | 'hard';
    requirements: string[];
    publication_status: 'draft' | 'published';
    activity_status: 'active' | 'completed' | 'inactive';
    start_date: string;
    end_date: string;
    link_video?: string;
    video_id?: string;
    acquisition_type: 'license' | 'purchase';
    acquisition_details?: string;
    acquisition_terms?: string;
    reward_amount?: number;
    reward_currency?: string;
    reward_description?: string;
    reward_delivery_type?: 'prototype' | 'final_software';
    reward_delivery_details?: string;
    category_id: number;
    company_id: number;
    created_at: string;
    updated_at: string;
    category?: Category;
    company?: Company;
    students_count?: number;
    companies_count?: number;
    students?: Student[];
    companies?: Company[];
}

export interface Student {
    id: number;
    user_id: number;
    created_at: string;
    updated_at: string;
    user?: User;
}

export interface Answer {
    id: number;
    form_id: number;
    company_id: number;
    answers: Record<string, any>;
    created_at: string;
    updated_at: string;
    form?: Form;
    company?: Company;
}

export interface Role {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
}

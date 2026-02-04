'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { contactSchema, type ContactFormData, projectTypes, budgetRanges } from '@/lib/validations';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface ContactFormProps {
  className?: string;
  locale: string;
}

export function ContactForm({ className, locale }: ContactFormProps) {
  const t = useTranslations('contact.form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      projectType: '',
      budget: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSubmitStatus('success');
      toast.success(t('success.title'), {
        description: t('success.description'),
      });
      reset();
    } catch (error) {
      setSubmitStatus('error');
      toast.error(t('error.title'), {
        description: t('error.description'),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Map project types for select options based on locale
  const projectTypeOptions = projectTypes.map((type) => ({
    value: type.value,
    label: locale === 'en' ? type.labelEn : type.label,
  }));

  // Map budget ranges for select options based on locale
  const budgetOptions = budgetRanges.map((range) => ({
    value: range.value,
    label: 'labelEn' in range && locale === 'en' ? range.labelEn : range.label,
  }));

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('space-y-6', className)}
      noValidate
    >
      {/* Name & Email Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label={t('name.label')}
          placeholder={t('name.placeholder')}
          error={errors.name?.message}
          required
          {...register('name')}
        />
        <Input
          label={t('email.label')}
          type="email"
          placeholder={t('email.placeholder')}
          error={errors.email?.message}
          required
          {...register('email')}
        />
      </div>

      {/* Company */}
      <Input
        label={t('company.label')}
        placeholder={t('company.placeholder')}
        error={errors.company?.message}
        {...register('company')}
      />

      {/* Project Type & Budget Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label={t('projectType.label')}
          placeholder={t('projectType.placeholder')}
          options={projectTypeOptions}
          error={errors.projectType?.message}
          required
          {...register('projectType')}
        />
        <Select
          label={t('budget.label')}
          placeholder={t('budget.placeholder')}
          options={budgetOptions}
          error={errors.budget?.message}
          {...register('budget')}
        />
      </div>

      {/* Message */}
      <Textarea
        label={t('message.label')}
        placeholder={t('message.placeholder')}
        error={errors.message?.message}
        required
        rows={6}
        {...register('message')}
      />

      {/* Submit Button */}
      <div className="flex items-center gap-4">
        <Button
          type="submit"
          size="lg"
          isLoading={isSubmitting}
          disabled={isSubmitting}
          className="min-w-[200px]"
        >
          {isSubmitting ? t('submitting') : t('submit')}
        </Button>

        {/* Status Indicators */}
        {submitStatus === 'success' && (
          <div className="flex items-center gap-2 text-green-500">
            <CheckCircle className="w-5 h-5" />
            <span className="text-sm">{t('success.title')}</span>
          </div>
        )}
        {submitStatus === 'error' && (
          <div className="flex items-center gap-2 text-red-500">
            <AlertCircle className="w-5 h-5" />
            <span className="text-sm">{t('error.title')}</span>
          </div>
        )}
      </div>
    </form>
  );
}

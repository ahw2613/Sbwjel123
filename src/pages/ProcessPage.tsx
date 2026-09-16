import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { realEstateServices } from '../data/services';
import { 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  ShieldAlert, 
  FileText, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp,
  Scale,
  Home,
  KeyRound,
  TrendingUp
} from 'lucide-react';

interface ProcessPageProps {
  onNavigate: (page: string, param?: string) => void;
}

export const ProcessPage: React.FC<ProcessPageProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const t = translations[language].processPage;
  const commonT = translations[language];

  const [activeTab, setActiveTab] = useState<'sell' | 'buy' | 'rent'>('sell');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const currentService = realEstateServices.find((s) => s.id === activeTab) || realEstateServices[0];

  const faqs = language === 'ko' ? [
    {
      q: '뉴저지 3일 변호사 검토(Attorney Review) 기간 중 계약을 취소할 수 있나요?',
      a: '네, 가능합니다. 뉴저지주 법령상 양측이 공인중개사 표준 계약서에 서명한 후 영업일 기준 3일 동안은 바이어나 셀러 어느 쪽이든 위약금이나 법적 불이익 없이 변호사를 통해 계약을 무조건 취소(Disapprove)하거나 조항 수정을 요구할 수 있습니다. 양측 변호사가 합의된 수정 조항(Rider)에 최종 서명해야 비로소 법적 구속력을 갖는 본 계약(Under Contract)으로 전환됩니다.'
    },
    {
      q: '미국 신용 점수(Credit Score)가 없는 한국 주재원이나 유학생도 렌트 계약이 가능한가요?',
      a: '네, 가능합니다. THE ADDRESS는 미국 주재원 및 유학생 전문 리로케이션 경험을 바탕으로, 한국 본사 재직증명서, 급여명세서, 주재원 파견 보증 서류 및 잔고증명서를 영문 패키지로 체계화하여 랜드로드 및 콘도 관리사무소와 직접 조율합니다. 보증금 추가 예치나 보증인(Guarantor) 규정을 원만하게 협의하여 100% 입주 승인을 이끌어냅니다.'
    },
    {
      q: '복수 오퍼(Multiple Offers) 경쟁 상황에서 바이어가 승리하는 핵심 전략은 무엇인가요?',
      a: '단순히 높은 가격만 제시하는 것보다 셀러의 필요(니즈)를 정확히 파악하는 것이 중요합니다. 감정가 부족 시 차액을 일정 한도 보전하는 감정 유예(Appraisal Gap Guarantee), 사소한 미관상 하자는 면제하는 인스펙션 유연 조항, 그리고 셀러가 이사할 시간을 배려하는 무상 거주(Use & Occupancy / Rent-back) 조건을 적절히 결합하면 최고가가 아니더라도 최종 낙점될 확률이 크게 높아집니다.'
    },
    {
      q: '주택 매도 시 리스팅부터 잔금 수령(Closing)까지 총 얼마나 걸리나요?',
      a: '사전 준비(CMA 가격 분석 및 전문 스테이징, 미디어 촬영)에 약 1~2주가 소요되며, 시장 론칭 후 오퍼 수락까지는 지역과 가격대에 따라 통상 1~3주가 걸립니다. 계약 체결 후 바이어의 모기지 승인과 인스펙션, 타운십 인허가를 거쳐 최종 클로징까지는 약 45일~60일 정도 소요됩니다. 올캐시 바이어의 경우 2~3주 안에도 신속한 클로징이 가능합니다.'
    },
    {
      q: '홈 인스펙션(Home Inspection)에서 중대한 하자가 발견되면 어떻게 해결하나요?',
      a: '인스펙터의 종합 리포트를 분석하여 지붕, 건물 기초 구조, HVAC 냉난방, 전기 패널, 배관 누수, 라돈 가스 등 안전과 구조에 직결되는 주요 결함을 특정합니다. 셀러에게 클로징 전 전문 기술자를 통한 수리 완료를 요청하거나, 수리 비용에 상응하는 현금 크레딧(Seller Credit) 또는 매매가 인하를 협상하여 바이어의 추가 지출을 원천 방어합니다.'
    }
  ] : [
    {
      q: 'Can a contract be cancelled during the NJ 3-Day Attorney Review?',
      a: 'Yes, absolutely. Under New Jersey law, both buyer and seller have 3 business days from signing a standard contract during which either party’s attorney may disapprove the agreement for any reason without penalty. The contract only becomes binding once both attorneys formally agree on protective amendments (riders).'
    },
    {
      q: 'Can international corporate expats rent without US credit history?',
      a: 'Yes. With extensive experience in Bergen County corporate relocations, THE ADDRESS packages Korean parent company employment verifications, expatriate assignment letters, and financial proof to satisfy management companies and landlords, ensuring seamless approvals.'
    },
    {
      q: 'What strategies win in multiple offer bidding competitions?',
      a: 'Winning offers combine strategic pricing with tactical certainty: appraisal gap guarantees, targeted structural-only inspection thresholds, escalation clauses, and flexible seller rent-back agreements.'
    },
    {
      q: 'What is the standard closing timeline from listing to settlement?',
      a: 'Preparation and staging take 1-2 weeks. After accepting an offer, financed transactions typically close in 45-60 days to accommodate mortgage underwriting and title clearance. Cash purchases can close in as little as 14-21 days.'
    },
    {
      q: 'How are major inspection defects resolved?',
      a: 'We evaluate the inspector’s comprehensive report focusing on environmental (radon/oil tank), structural, and mechanical defects. We then negotiate formal seller repair obligations, monetary closing credits, or price adjustments.'
    }
  ];

  const timelineCards = [
    {
      typeKo: '주택 매매 (모기지 융자)',
      typeEn: 'Home Purchase (Financed)',
      duration: '45 – 60 Days',
      descKo: '사전 승인부터 쇼잉, 변호사 검토, 인스펙션, 은행 감정 및 최종 소유권 이전',
      descEn: 'From offer acceptance through attorney review, underwriting, appraisal, and closing',
    },
    {
      typeKo: '주택 매매 (전액 현금)',
      typeEn: 'Cash Purchase',
      duration: '14 – 21 Days',
      descKo: '모기지 심사 면제로 빠른 타이틀 확인 및 즉시 클로징 가능',
      descEn: 'Accelerated title search, municipal certifications, and rapid deed recording',
    },
    {
      typeKo: '주택 매도 리스팅',
      typeEn: 'Property Sale Representation',
      duration: '60 – 75 Days',
      descKo: '프리마케팅, 스테이징, 오픈하우스, 계약 협상 및 파이널 펀딩까지 전 과정',
      descEn: 'Preparation, editorial media launch, offer negotiation, through final escrow payout',
    },
    {
      typeKo: '프리미엄 렌트 & 리로케이션',
      typeEn: 'Rental & Expat Placement',
      duration: '7 – 14 Days',
      descKo: '맞춤 투어, 주재원 서류 심사, 리스 계약 체결 및 당일 입주 체크리스트 점검',
      descEn: 'Criteria matching, corporate documentation approval, lease execution, and move-in',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 space-y-20">
      {/* 1. Page Header with Clean Typography & Natural Line Breaks */}
      <div className="border-b border-neutral-200 pb-10">
        <div className="text-xs font-semibold tracking-[0.25em] text-neutral-400 uppercase mb-3">
          {t.tag}
        </div>
        <h1 className="text-3xl sm:text-5xl font-normal tracking-tight text-neutral-950 leading-tight">
          {t.title}
        </h1>
        <p className="mt-4 text-base sm:text-lg text-neutral-600 max-w-3xl font-light leading-relaxed">
          {t.subtitle}
        </p>

        {/* 3 Main Process Tracks Tabs */}
        <div className="flex flex-wrap gap-3 mt-8">
          <button
            onClick={() => setActiveTab('sell')}
            className={`px-6 py-3 text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all cursor-pointer border ${
              activeTab === 'sell'
                ? 'bg-neutral-950 text-white border-neutral-950 shadow-sm'
                : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-950 hover:text-neutral-950'
            }`}
          >
            {t.navSelling}
          </button>
          <button
            onClick={() => setActiveTab('buy')}
            className={`px-6 py-3 text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all cursor-pointer border ${
              activeTab === 'buy'
                ? 'bg-neutral-950 text-white border-neutral-950 shadow-sm'
                : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-950 hover:text-neutral-950'
            }`}
          >
            {t.navBuying}
          </button>
          <button
            onClick={() => setActiveTab('rent')}
            className={`px-6 py-3 text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all cursor-pointer border ${
              activeTab === 'rent'
                ? 'bg-neutral-950 text-white border-neutral-950 shadow-sm'
                : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-950 hover:text-neutral-950'
            }`}
          >
            {t.navRenting}
          </button>
        </div>
      </div>

      {/* 2. Track Highlight Banner */}
      <div className="bg-stone-50 border border-stone-200 p-8 sm:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="text-xs font-semibold tracking-[0.2em] text-neutral-500 uppercase">
              {language === 'ko' ? currentService.titleKo : currentService.titleEn}
            </div>
            <h2 className="text-2xl sm:text-3xl font-normal text-neutral-950 tracking-tight leading-snug">
              {language === 'ko' ? currentService.taglineKo : currentService.taglineEn}
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-light max-w-2xl">
              {language === 'ko' ? currentService.summaryKo : currentService.summaryEn}
            </p>
          </div>
          <div className="lg:col-span-4 flex lg:justify-end">
            <button
              onClick={() => onNavigate(currentService.targetPage)}
              className="px-8 py-4 bg-neutral-950 text-white text-xs font-semibold tracking-wider uppercase hover:bg-neutral-800 transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <span>{language === 'ko' ? currentService.ctaKo : currentService.ctaEn}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Deep Step-by-Step Milestones Timeline */}
      <div className="space-y-8">
        <div className="border-b border-neutral-200 pb-4">
          <h2 className="text-xl sm:text-2xl font-normal tracking-tight text-neutral-950">
            {language === 'ko' 
              ? `${currentService.titleKo} 상세 단계별 로드맵` 
              : `${currentService.titleEn} Detailed Procedural Roadmap`}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            {language === 'ko'
              ? '전문 에이전트와 부동산 변호사, 인스펙터, 렌더가 공조하여 각 단계를 철저히 검증합니다.'
              : 'Coordinated execution with licensed brokers, real estate attorneys, structural inspectors, and lenders.'}
          </p>
        </div>

        <div className="space-y-6">
          {currentService.steps.map((stepItem, idx) => (
            <div
              key={stepItem.step}
              className="bg-white border border-neutral-200 p-6 sm:p-8 transition-all hover:border-neutral-900 group"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 flex-shrink-0 bg-neutral-100 text-neutral-950 font-mono font-bold text-lg flex items-center justify-center border border-neutral-200 group-hover:bg-neutral-950 group-hover:text-white transition-colors">
                    {stepItem.step}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg sm:text-xl font-semibold text-neutral-950 tracking-tight">
                        {language === 'ko' ? stepItem.titleKo : stepItem.titleEn}
                      </h3>
                      {(stepItem.keyHighlightKo || stepItem.keyHighlightEn) && (
                        <span className="text-[11px] font-medium px-2.5 py-0.5 bg-neutral-100 text-neutral-700 tracking-tight">
                          {language === 'ko' ? stepItem.keyHighlightKo : stepItem.keyHighlightEn}
                        </span>
                      )}
                    </div>
                    <p className="mt-3 text-sm sm:text-base text-neutral-600 leading-relaxed font-light max-w-4xl">
                      {language === 'ko' ? stepItem.descKo : stepItem.descEn}
                    </p>
                  </div>
                </div>

                <div className="hidden md:flex items-center text-xs font-mono text-neutral-400 group-hover:text-neutral-900 transition-colors flex-shrink-0">
                  Step {idx + 1} / {currentService.steps.length}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Estimated Transaction Timelines */}
      <div className="border border-neutral-200 bg-stone-50/60 p-8 sm:p-10">
        <div className="mb-6">
          <div className="text-xs font-semibold tracking-[0.25em] text-neutral-400 uppercase mb-1">
            TIMELINE MATRIX
          </div>
          <h2 className="text-xl sm:text-2xl font-normal tracking-tight text-neutral-950">
            {t.timelineTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {timelineCards.map((c, i) => (
            <div key={i} className="bg-white p-6 border border-neutral-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-neutral-500 text-xs font-medium uppercase tracking-wider mb-2">
                  <Clock size={14} />
                  <span>{language === 'ko' ? c.typeKo : c.typeEn}</span>
                </div>
                <div className="text-2xl font-normal font-mono text-neutral-950 tracking-tight mt-1">
                  {c.duration}
                </div>
              </div>
              <p className="mt-4 text-xs text-neutral-600 leading-relaxed font-light border-t border-neutral-100 pt-3">
                {language === 'ko' ? c.descKo : c.descEn}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Crucial New Jersey Legal Protections (Attorney Review, Inspections, Title) */}
      <div className="space-y-6">
        <div>
          <div className="text-xs font-semibold tracking-[0.25em] text-neutral-400 uppercase mb-1">
            LEGAL SAFEGUARDS
          </div>
          <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-neutral-950">
            {t.legalTitle}
          </h2>
          <p className="text-sm text-neutral-600 font-light mt-1 max-w-2xl leading-relaxed">
            {t.legalDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-7 border border-neutral-200">
            <div className="w-10 h-10 bg-neutral-100 flex items-center justify-center text-neutral-900 mb-5">
              <Scale size={20} />
            </div>
            <h3 className="text-base font-semibold text-neutral-950 mb-2">
              {t.attorneyReviewTitle}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
              {t.attorneyReviewDesc}
            </p>
          </div>

          <div className="bg-white p-7 border border-neutral-200">
            <div className="w-10 h-10 bg-neutral-100 flex items-center justify-center text-neutral-900 mb-5">
              <ShieldAlert size={20} />
            </div>
            <h3 className="text-base font-semibold text-neutral-950 mb-2">
              {t.inspectionTitle}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
              {t.inspectionDesc}
            </p>
          </div>

          <div className="bg-white p-7 border border-neutral-200">
            <div className="w-10 h-10 bg-neutral-100 flex items-center justify-center text-neutral-900 mb-5">
              <FileText size={20} />
            </div>
            <h3 className="text-base font-semibold text-neutral-950 mb-2">
              {t.closingTitle}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
              {t.closingDesc}
            </p>
          </div>
        </div>
      </div>

      {/* 6. FAQ Accordion */}
      <div className="space-y-6 pt-4 border-t border-neutral-200">
        <div>
          <div className="text-xs font-semibold tracking-[0.25em] text-neutral-400 uppercase mb-1">
            Q&A
          </div>
          <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-neutral-950">
            {t.faqTitle}
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isExpanded = expandedFaq === index;
            return (
              <div
                key={index}
                className="bg-white border border-neutral-200 transition-colors"
              >
                <button
                  onClick={() => setExpandedFaq(isExpanded ? null : index)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-semibold text-neutral-950 tracking-tight">
                    {faq.q}
                  </span>
                  <span className="p-1 text-neutral-400 flex-shrink-0">
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </span>
                </button>
                {isExpanded && (
                  <div className="px-6 pb-6 text-xs sm:text-sm text-neutral-600 leading-relaxed font-light border-t border-neutral-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 7. Bottom Action Banner */}
      <div className="bg-neutral-950 text-white p-10 sm:p-14 text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-white leading-tight">
          {t.scheduleCtaTitle}
        </h2>
        <p className="text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto font-light leading-relaxed">
          {t.scheduleCtaDesc}
        </p>
        <div className="pt-4 flex justify-center">
          <button
            onClick={() => onNavigate('contact')}
            className="px-8 py-3.5 bg-white text-neutral-950 text-xs font-semibold tracking-wider uppercase hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            {t.scheduleCtaButton}
          </button>
        </div>
      </div>
    </div>
  );
};

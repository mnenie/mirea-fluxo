import type { Ref } from 'vue'
import jsPDF from 'jspdf'
import { formatDate } from '~/helpers/formatDateHelper'
import type { Stage } from '~/types/stages.interface'

const arrDatesMonths = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'] as const

const date = new Date()
const _date = formatDate(date)

export async function useJsToPdf(stage: Ref<Stage>, totalOrderPriceByStages: Ref<number>, executor: string) {
  // eslint-disable-next-line new-cap
  const doc = new jsPDF()

  const responseFont = await fetch('https://raw.githubusercontent.com/alixaxel/typhon/refs/heads/master/typeface/serif/Times%20New%20Roman.base64').then(res => res.text())

  doc.addFileToVFS('WorkSans-normal.ttf', responseFont)
  doc.addFont('WorkSans-normal.ttf', 'WorkSans', 'normal')
  doc.setFont('WorkSans')

  doc.setFontSize(16)
  doc.text('ДОГОВОР', doc.internal.pageSize.width / 2, 20, { align: 'center' })

  let cursorY = 30

  doc.setFontSize(10)
  doc.setTextColor(150)
  doc.text(`«${_date!.split('.')[0]}» ${arrDatesMonths[_date!.split('.')[1] as unknown as number - 1]} 2024 г.`, doc.internal.pageSize.width - 10, cursorY, {
    align: 'right',
  })

  cursorY += 20

  doc.setFontSize(12)
  doc.setTextColor(0)

  const text = `От ответственного лица данного заказа ${executor}, действующего на основании государственного контракта, именуемый в дальнейшем «Работодатель», с одной стороны, и гк. ${stage.value.organization}, именуемая в дальнейшем «Работник», с другой стороны, именуемые в дальнейшем «Стороны», заключили настоящий договор, в дальнейшем «Договор», о нижеследующем:`

  const pageWidth = doc.internal.pageSize.width - 20

  const words = text.split(' ')
  let line = ''

  words.forEach((word, index) => {
    const testLine = `${line} ${word}`.trim()
    const testWidth = doc.getTextWidth(testLine)

    if (testWidth > pageWidth) {
      doc.text(line.trim(), 10, cursorY)
      cursorY += 10
      line = word
    }
    else {
      line = testLine
    }

    if (index === words.length - 1) {
      doc.text(line.trim(), 10, cursorY)
    }
  })

  cursorY += 20

  const paragraphs = doc.splitTextToSize(
    '1.1. Работодатель обязуется оплатить Работнику вознаграждение за выполнение работ (услуг).\n'
    + '1.2. Работы выполнены в полном объеме, в соответствии с условиями государственного контракта, в установленные сроки и по согласованной сторонами стоимости.',
    pageWidth,
  )

  paragraphs.forEach((line: any) => {
    doc.text(line, 10, cursorY)
    cursorY += 10
  })

  doc.setFontSize(12)
  doc.setTextColor(0)
  cursorY += 20

  doc.text('Этап', 10, cursorY)
  doc.text('Цена', pageWidth / 2, cursorY, { align: 'center' })
  cursorY += 10

  doc.text(stage.value.title, 10, cursorY)
  doc.text(stage.value.price.toString(), pageWidth / 2, cursorY, { align: 'center' })
  cursorY += 10

  cursorY += 10

  doc.setFontSize(12)
  doc.setTextColor(0)
  doc.text('Итого по всем этапам:', 10, cursorY)
  doc.text(totalOrderPriceByStages.value.toString(), pageWidth / 2, cursorY, { align: 'center' })
  cursorY += 10

  if (totalOrderPriceByStages.value <= stage.value.price) {
    doc.text(`Цена не превышает установленную в договоре сумму ${stage.value.price}.`, 10, cursorY)
  }
  cursorY += 20
  const img = new Image()
  // TODO
  img.src = import('~/assets/new.png') as unknown as string
  img.onload = () => {
    const imgWidth = 80
    const imgHeight = 30
    const xPos = (doc.internal.pageSize.width - imgWidth) / 2
    doc.addImage(img, 'PNG', xPos, cursorY, imgWidth, imgHeight)
  }

  doc.save('order_contract.pdf')
}
